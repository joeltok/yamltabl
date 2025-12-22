import * as vscode from 'vscode';
import { renderHtml } from '@yamltabl/yamltabl-core';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      const defaultRender = md.renderer.rules.fence;

      md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: any, self: any) => {
        const token = tokens[idx];
        
        if (token.info === 'yamltabl') {

          return renderHtml(token.content)
        }

        return defaultRender(tokens, idx, options, env, self);
      };
      
      return md;
    }
  };
}

export function deactivate() {}
