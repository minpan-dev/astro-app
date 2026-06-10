export const transformerCopyCode = () => ({
  name: 'transformer-copy-code',
  pre(node) {
    // Add group class to pre so we can use group-hover:opacity-100 on the button
    this.addClassToHast(node, "group");
    
    // Add relative class if not already there, needed for absolute button
    if (!node.properties.className?.includes("relative")) {
      this.addClassToHast(node, "relative");
    }

    const copyButton = {
      type: "element",
      tagName: "button",
      properties: {
        class: "copy-code-btn absolute top-2 right-2 p-1.5 rounded-md border border-border bg-muted/80 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 z-20 cursor-pointer",
        "aria-label": "Copy code",
        "title": "Copy code",
        "data-copy-state": "copy"
      },
      children: [
        // Copy Icon (Lucide)
        {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "icon-copy block"
          },
          children: [
            { type: "element", tagName: "rect", properties: { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2" }, children: [] },
            { type: "element", tagName: "path", properties: { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }, children: [] }
          ]
        },
        // Check Icon (Lucide)
        {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: "icon-check hidden text-green-500"
          },
          children: [
            { type: "element", tagName: "path", properties: { d: "M20 6 9 17l-5-5" }, children: [] }
          ]
        }
      ]
    };

    node.children.push(copyButton);
  }
});
