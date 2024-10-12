import React from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

function LatexCommands() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="mb-8 text-3xl font-bold text-center">Latex Commands</h2>

      <p className="mb-4 text-lg">
        <strong>Bold text:</strong>{" "}
        <Latex>{`\\textbf{This is bold text.`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Italic text:</strong>{" "}
        <Latex>{`\\textit{This is italic text.}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Underlined text:</strong>{" "}
        <Latex>{`\\underline{This is underlined text.}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Overlined text:</strong>{" "}
        <Latex>{`\\overline{This is overlined text.}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Colored text:</strong>{" "}
        <Latex>{`\\textcolor{red}{This is red text.}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Sized text:</strong>{" "}
        <Latex>{`\\large This is large text.`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Font family:</strong>{" "}
        <Latex>{`\\text{\\fontfamily{Times New Roman}\\selectfont This is Times New Roman text.}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Superscript (power):</strong> <Latex>{`x^2 + y^3`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Subscript:</strong> <Latex>{`H_2O`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Fraktur font:</strong> <Latex>{`\\mathfrak{ABCDEFG}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>Combined formatting:</strong>{" "}
        <Latex>{`\\textbf{\\textit{This is bold and italic text.}}`}</Latex>
      </p>
      <p className="mb-4 text-lg">
        <strong>More commands:</strong>
        <ul className="pl-6 list-disc">
          <li>
            <Latex>{`\\emph{text}`}</Latex>: Employs the current emphasis style
          </li>
          <li>
            <Latex>{`\\textcolor{color_name}{text}`}</Latex>: Sets the text
            color
          </li>
          <li>
            <Latex>{`\\fontfamily{font_name}\\selectfont text`}</Latex>: Sets
            the font family
          </li>
          <li>
            <Latex>{`\\large, \\small, \\tiny, \\huge, \\Large`}</Latex>:
            Adjusts text size
          </li>
          <li>
            <Latex>{`\\textsc{text}`}</Latex>: Small caps
          </li>
          <li>
            <Latex>{`\\sffamily`}</Latex>: Sans-serif font
          </li>
          <li>
            <Latex>{`\\ttfamily`}</Latex>: Typewriter font
          </li>
        </ul>
      </p>
    </div>
  );
}

export default LatexCommands;
