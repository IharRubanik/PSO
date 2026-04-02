import styles from "./Corners.module.css";

interface CornersProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Corners({ size = 40, color, strokeWidth }: CornersProps) {
  const cssVars = {} as Record<string, string>;
  if (color) cssVars["--corner-color"] = color;
  if (strokeWidth) cssVars["--corner-stroke"] = `${strokeWidth}px`;

  return (
    <div className={styles.corners} style={Object.keys(cssVars).length ? cssVars as React.CSSProperties : undefined}>
      <span className={styles.tl} style={{ width: size, height: size }} />
      <span className={styles.tr} style={{ width: size, height: size }} />
      <span className={styles.bl} style={{ width: size, height: size }} />
      <span className={styles.br} style={{ width: size, height: size }} />
    </div>
  );
}
