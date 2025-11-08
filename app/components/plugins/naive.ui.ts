import { defineNuxtPlugin } from "#app";
import { setup } from "@css-render/vue3-ssr";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server && nuxtApp.ssrContext) {
    const { collect } = setup(nuxtApp.vueApp);
    const originalRenderMeta = nuxtApp.ssrContext.renderMeta as () => Promise<any> | any;

    nuxtApp.ssrContext.renderMeta = () => {
      const styles = collect();
      
      if (!originalRenderMeta) {
        return { headTags: styles };
      }
      
      const originalMeta = originalRenderMeta();
      
      // Handle Promise
      if (originalMeta instanceof Promise) {
        return originalMeta.then((meta: any) => ({
          ...meta,
          headTags: (meta.headTags || '') + styles,
        }));
      }
      
      // Handle direct return
      return {
        ...(originalMeta as any),
        headTags: ((originalMeta as any)?.headTags || '') + styles,
      };
    };
  }
});