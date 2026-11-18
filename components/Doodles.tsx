// Craft Desk の手描きドゥードゥル（星・ゼムクリップ）。装飾なので読み上げない
export function Star({ size = 48 }: { size?: number }) {
  return (
    <svg className="cd-doodle" width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path className="fill-star ink" d="M50 6 L61 37 L95 38 L68 59 L78 92 L50 73 L22 92 L32 59 L5 38 L39 37 Z" />
    </svg>
  );
}

export function Clip() {
  return (
    <svg className="cd-doodle" width="22" height="56" viewBox="0 0 22 56" aria-hidden="true">
      <path className="clip" d="M7 18 V40 a4 4 0 0 0 8 0 V8 a6 6 0 0 0 -12 0 V44 a8 8 0 0 0 16 0 V16" />
    </svg>
  );
}
