import React from "react";

const Commands = () => {
  return (
    <div className="p-2 mx-auto max-w-4xl text-sm">
      <h1 className="mb-4 text-2xl font-bold text-center">LaTeX Commands</h1>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <h2 className="mb-2 font-bold">Text Formatting</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <code>\textbf&#123;text&#125;</code>: Bold text
            </li>
            <li>
              <code>\textit&#123;text&#125;</code>: Italic text
            </li>
            <li>
              <code>\underline&#123;text&#125;</code>: Underlined text
            </li>
            <li>
              <code>\overline&#123;text&#125;</code>: Overlined text
            </li>
            <li>
              <code>\textcolor&#123;color&#125;&#123;text&#125;</code>: Colored
              text
            </li>
            <li>
              <code>\emph&#123;text&#125;</code>: Emphasized text
            </li>
            <li>
              <code>\textsc&#123;text&#125;</code>: Small caps
            </li>
            <li>
              <code>\uppercase&#123;text&#125;</code>: Uppercase text
            </li>
            <li>
              <code>\lowercase&#123;text&#125;</code>: Lowercase text
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-bold">Font Size and Family</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <code>\tiny, \scriptsize, \footnotesize</code>: Smaller text
            </li>
            <li>
              <code>\small, \normalsize, \large</code>: Normal to larger text
            </li>
            <li>
              <code>\Large, \LARGE, \huge, \Huge</code>: Larger text sizes
            </li>
            <li>
              <code>\rmfamily</code>: Roman (serif) font
            </li>
            <li>
              <code>\sffamily</code>: Sans-serif font
            </li>
            <li>
              <code>\ttfamily</code>: Typewriter (monospace) font
            </li>
            <li>
              <code>\fontfamily&#123;font&#125;\selectfont</code>: Set font
              family
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-bold">Math Mode</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <code>x^2, x_2</code>: Superscript and subscript
            </li>
            <li>
              <code>\frac&#123;num&#125;&#123;den&#125;</code>: Fractions
            </li>
            <li>
              <code>\sqrt&#123;x&#125;, \sqrt[n]&#123;x&#125;</code>: Square/nth
              root
            </li>
            <li>
              <code>\sum, \prod, \int</code>: Sum, product, integral
            </li>
            <li>
              <code>\lim, \inf, \sup</code>: Limit, infimum, supremum
            </li>
            <li>
              <code>\mathbf&#123;x&#125;</code>: Bold math symbols
            </li>
            <li>
              <code>\mathcal&#123;A&#125;</code>: Calligraphic letters
            </li>
            <li>
              <code>\mathfrak&#123;A&#125;</code>: Fraktur font
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-bold">Environments and Structures</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <code>
                \begin&#123;equation&#125; ... \end&#123;equation&#125;
              </code>
            </li>
            <li>
              <code>\begin&#123;align&#125; ... \end&#123;align&#125;</code>
            </li>
            <li>
              <code>\begin&#123;itemize&#125; ... \end&#123;itemize&#125;</code>
            </li>
            <li>
              <code>
                \begin&#123;enumerate&#125; ... \end&#123;enumerate&#125;
              </code>
            </li>
            <li>
              <code>\begin&#123;table&#125; ... \end&#123;table&#125;</code>
            </li>
            <li>
              <code>\begin&#123;figure&#125; ... \end&#123;figure&#125;</code>
            </li>
            <li>
              <code>\begin&#123;tabular&#125; ... \end&#123;tabular&#125;</code>
            </li>
            <li>
              <code>
                \begin&#123;document&#125; ... \end&#123;document&#125;
              </code>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-bold">Miscellaneous</h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              <code>\newpage</code>: Start a new page
            </li>
            <li>
              <code>\hspace&#123;length&#125;</code>: Horizontal space
            </li>
            <li>
              <code>\vspace&#123;length&#125;</code>: Vertical space
            </li>
            <li>
              <code>\usepackage&#123;package&#125;</code>: Include package
            </li>
            <li>
              <code>\cite&#123;key&#125;</code>: Citation
            </li>
            <li>
              <code>\label&#123;key&#125;</code>: Label for referencing
            </li>
            <li>
              <code>\ref&#123;key&#125;</code>: Reference a label
            </li>
            <li>
              <code>\input&#123;filename&#125;</code>: Include external file
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Commands;
