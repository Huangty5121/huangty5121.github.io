const ME = 'Tin-Yeh Huang';

export function renderAuthors(authors: string[], compact = false) {
  const hasCoFirst = authors.some(a => a.endsWith('*'));

  return (
    <>
      {authors.map((author, i) => {
        const isCoFirst = author.endsWith('*');
        const cleanName = author.replace(/\*$/, '');
        const isMe = cleanName === ME;

        return (
          <span key={i}>
            <span
              className={
                isMe
                  ? 'text-neon-cyan/80 font-medium'
                  : ''
              }
            >
              {cleanName}
            </span>
            {isCoFirst && (
              <sup className="text-neon-amber/60 text-[8px] ml-[1px]" title="Co-first author (equal contribution)">*</sup>
            )}
            {i < authors.length - 1 && ', '}
          </span>
        );
      })}
      {hasCoFirst && !compact && (
        <span className="text-frost/20 text-[9px] ml-1.5 italic" title="Equal contribution">
          (* equal contribution)
        </span>
      )}
    </>
  );
}

