// Splits text into word spans for useScrollWords. Spaces stay outside the spans so lines wrap normally.
export function Words({ text }) {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      {i > 0 && ' '}
      <span data-word className="inline-block">
        {word}
      </span>
    </span>
  ))
}
