import {marked, type RendererObject, type Tokens} from 'marked'
import hljs from 'highlight.js'

export const renderer: RendererObject = {
    link({href, title, text}: Tokens.Link) {
        return `<a target="_blank" class="link link-primary" href="${href}" title="${title}">${text}</a>`
    },
    table({header: hd, rows}: Tokens.Table) {
        const header = hd
            .map(({text}) => {
                return `
      <th class="text-base-content text-large">${marked.parseInline(text)}</th>
    `
            })
            .join('\n')

        const body = rows
            .map((row) => {
                return `
      <tr>${row
                    .map(({text}) => {
                        return `
        <td class="text-base-content text-large">${marked.parseInline(text)}</td>
      `
                    })
                    .join('\n')}</tr>
    `
            })
            .join('\n')

        return `
   <div class="bg-base-100 p-2.5 rounded-xl shadow-lg shadow-base-200 my-5">
    <div class="overflow-x-auto py-4">
        <table class="table table-sm text-large table-zebra border">
        <thead>
            ${header}
        </thead>
        <tbody>
            ${body}
        </tbody>
    </table>
    </div>
    </div>
  `
    },
    // tablerow(content: string) {
    //   return `
    //   <tr class="hover">${content}</tr>
    // `
    // },
    // tablecell(content: string) {
    //   return `
    //   <td>${content}</td>
    // `
    // },
    code({text: code, lang: language}: Tokens.Code) {
        // return `
        //   <pre><div class="mockup-code my-3"><div class="px-4"><code>${code}</code></div></div></pre>
        // `;

        if (language) {
            const ignoreIllegals = true
            return `
  <div class="p-2 flex w-full">
       <pre class="w-full"><div class="mockup-code bg-neutral-800 my-3 relative shadow-xl w-full overflow-auto"><div class="px-4 flex-1 overflow-auto h-full w-full"><code class="language-${language}">${
                hljs.highlight(code, {
                    language,
                    ignoreIllegals,
                }).value
            }</code></div></div></pre>
  </div>
    `
        } else {
            return `
  <div class="p-3 flex w-full">
    <div class="mockup-code bg-base-100 my-2.5 w-full overflow-auto max-w-full"><pre class="w-full text-sm md:text-md text-base-content"><div class="px-4 flex-1 overflow-auto h-full w-full"><code>${code}</code></div></pre></div>
  </div>
  `
        }
    },
    list({ordered, start, items}: Tokens.List) {
        // console.log('items is -> ', items)
        const body = items
            .map(({text}) => {
                return `
      <li class="text-base-accent text-large">${marked.parseInline(text)}</li>
      `
            })
            .join('\n')

        if (ordered) {
            if (start) {
                return `
         <div class="my-2 py-2 mx-3">
            <ol start="${start}" class="list-decimal list-outside mx-5 space-y-0.5 md:space-y-1 lg:space-y-1.5">${body}</ol>
         </div>
      `
            }
            return `
         <div class="my-2 py-2 mx-3">
            <ol class="list-decimal mx-5 list-outside space-y-0.5 md:space-y-1 lg:space-y-1.5">${body}</ol>
         </div>
    `
        } else {
            return `
         <div class="my-2 py-2 mx-3">
            <ul class="list-disc list-outside mx-5 space-y-0.5 md:space-y-1 lg:space-y-1.5">${body}</ul>
         </div>
    `
        }
    },
    listitem({text}: Tokens.ListItem) {
        return `
    <li class="text-base-accent text-small">${marked.parseInline(text)}</li>
  `
    },
    paragraph({text}: Tokens.Paragraph) {
        return `
    <p class="text-base-accent leading-relaxed text-small">${marked.parseInline(text)}</p>
  `
    },
    heading({text, depth: level}: Tokens.Heading) {
        let cssClassLevel = 'text-casablanca-950 text-large my-2'

        switch (level) {
            case 1:
                cssClassLevel = 'text-casablanca-950 text-extra-large my-2'
                break
            case 2:
                cssClassLevel = 'text-casablanca-950  text-large my-1.5 '
                break
            case 3:
                cssClassLevel = 'text-casablanca-950  text-small my-1.5'
                break
            case 4:
                cssClassLevel = 'text-casablanca-950  text-extra-small  my-1'
                break
            case 5:
                cssClassLevel = 'text-casablanca-950 text-extra-extra-small my-1'
                break
            case 6:
                cssClassLevel = 'text-casablanca-950   text-extra-extra-small-2  my-0.5'
                break
        }

        return `
    <h${level} class="${cssClassLevel} font-semibold text-base-accent text-casablanca-950">${marked.parseInline(text)}</h${level}>
  `
    },
    hr() {
        return `
    <hr class="my-4 border-neutral-200"/>
  `
    },
    blockquote({text: quote}: Tokens.Blockquote) {
        return `
    <blockquote class="my-4 border-l-4 border-neutral-200 pl-4">${quote}</blockquote>
  `
    },
    image({href, title, text}: Tokens.Image) {
        return `
    <img src="${href}" alt="${text}" title="${title}" class="w-full"/>
  `
    },
    strong({text}: Tokens.Strong) {
        return `
    <strong class="text-casablanca-950 font-semi-bold  my-2.5 text-small">${text}</strong>
  `
    },
    codespan({text: code}: Tokens.Codespan) {
        // return `
        //   <pre><div class="mockup-code"><div class="px-4"><code>${code}</code></div></div></pre>
        // `;

        // we'll rather render this like in chatGPT
        return `
    <code class="font-semi-bold my-1">&acute;${code}&acute;</code>
  `
    },
    em({text}: Tokens.Em) {
        return `
    <em class="font-light my-1 text-small">${text}</em>
  `
    },
    del({text}: Tokens.Del) {
        return `
    <del class="font-poppins-light my-1 text-small">${text}</del>
  `
    },
    text({text, type}: Tokens.Text | Tokens.Escape | Tokens.Tag) {
        if (type === 'text') {
            return `
      <span class="text-small">${text}</span>
    `
        } else if (type === 'escape') {
            return `
      <span class="text-small">${text}</span>
    `
        } else {
            return `
      <span class="text-small">${text}</span>
    `
        }
    },
}

