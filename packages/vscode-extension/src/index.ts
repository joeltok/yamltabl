import * as vscode from 'vscode';
import { renderHtml } from '@yamltabl/yamltabl-core';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      const defaultRender = md.renderer.rules.fence;

      md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: any, self: any) => {
        const token = tokens[idx];        
        if (token.info === 'yamltabl') {
          try {
            return renderHtml(token.content)
          } catch (err) {
            let errMessage = "Yamltabl Errors:<br>"
            err.issues.forEach(issue => {
              errMessage = errMessage + `- ${issue}<br>`
            })
            return errMessage
          }
        }

        return defaultRender(tokens, idx, options, env, self);
      };
      
      return md;
    }
  };
}

export function deactivate() {}
