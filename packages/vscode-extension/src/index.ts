import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      // Hook into the fence rule to catch your custom code blocks
      const defaultRender = md.renderer.rules.fence;

      md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: any, self: any) => {
        const token = tokens[idx];
        
        if (token.info === 'yamltabl') {
          return `<div class="yamltabl-rendered">${token.content}</div>`;
        }

        return defaultRender(tokens, idx, options, env, self);
      };
      
      return md;
    }
  };
}

export function deactivate() {}
