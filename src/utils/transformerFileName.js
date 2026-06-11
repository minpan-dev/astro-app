export const transformerFileName = () => ({
  name: 'transformer-file-name',
  pre(node) {
    const raw = this.options.meta?.__raw?.split(" ");
    if (!raw) return;

    const metaMap = new Map();
    for (const item of raw) {
      const [key, value] = item.split("=");
      if (!key || !value) continue;
      metaMap.set(key, value.replace(/["'`]/g, ""));
    }

    const file = metaMap.get("file") || metaMap.get("title") || metaMap.get("filename");
    if (!file) return;

    // Make code block relative and add enough top padding for the mac header
    this.addClassToHast(node, "relative !pt-12 !mt-6");

    // macOS Header Bar
    const header = {
      type: "element",
      tagName: "div",
      properties: {
        // Position it at the top, matching the border radius of the pre block
        class: "absolute top-0 left-0 w-full h-11 flex items-center px-4 bg-muted/50 border-b border-border rounded-t-[calc(var(--radius)-1px)]",
      },
      children: [
        // Three mac dots
        {
          type: "element",
          tagName: "div",
          properties: { class: "flex items-center gap-2 z-10" },
          children: [
            { type: "element", tagName: "span", properties: { class: "size-3 rounded-full bg-[#ff5f56]" }, children: [] },
            { type: "element", tagName: "span", properties: { class: "size-3 rounded-full bg-[#ffbd2e]" }, children: [] },
            { type: "element", tagName: "span", properties: { class: "size-3 rounded-full bg-[#27c93f]" }, children: [] },
          ]
        },
        // Filename in the center
        {
          type: "element",
          tagName: "div",
          properties: { class: "absolute inset-0 flex items-center justify-center pointer-events-none" },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { class: "text-xs font-medium text-muted-foreground font-mono" },
              children: [{ type: "text", value: file }]
            }
          ]
        }
      ]
    };

    node.children.push(header);
  },
});
