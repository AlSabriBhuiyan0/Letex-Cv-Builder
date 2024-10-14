import React from 'react';

const Commands = () => {
  return (
    <div className="p-4 mx-auto max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold text-center">LaTeX Commands</h1>
      
      <div className="space-y-4">
        <p><strong>Bold text:</strong> \textbf&#123;This is bold text.&#125;</p>
        <p><strong>Italic text:</strong> \textit&#123;This is italic text.&#125;</p>
        <p><strong>Underlined text:</strong> \underline&#123;This is underlined text.&#125;</p>
        <p><strong>Overlined text:</strong> \overline&#123;This is overlined text.&#125;</p>
        <p><strong>Colored text:</strong> \textcolor&#123;red&#125;&#123;This is red text.&#125;</p>
        <p><strong>Sized text:</strong> \large This is large text.</p>
        <p><strong>Font family:</strong> \text&#123;\fontfamily&#123;Times New Roman&#125;\selectfont This is Times New Roman text.&#125;</p>
        <p><strong>Superscript (power):</strong> x^2 + y^3</p>
        <p><strong>Subscript:</strong> H_2O</p>
        <p><strong>Fraktur font:</strong> \mathfrak&#123;ABCDEFG&#125;</p>
        <p><strong>Combined formatting:</strong> \textbf&#123;\textit&#123;This is bold and italic text.&#125;&#125;</p>
        
        <div>
          <p><strong>More commands:</strong></p>
          <ul className="ml-4 list-disc list-inside">
            <li>\emph&#123;text&#125;: Employs the current emphasis style</li>
            <li>\textcolor&#123;color_name&#125;&#123;text&#125;: Sets the text color</li>
            <li>\fontfamily&#123;font_name&#125;\selectfont text: Sets the font family</li>
            <li>\large, \small, \tiny, \huge, \Large: Adjusts text size</li>
            <li>\textsc&#123;text&#125;: Small caps</li>
            <li>\sffamily: Sans-serif font</li>
            <li>\ttfamily: Typewriter font</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Commands;
