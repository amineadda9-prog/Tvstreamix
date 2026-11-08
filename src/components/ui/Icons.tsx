import type { ReactNode, SVGProps } from "react";
import { cn } from "@/utils/cn";

export type IconProps = SVGProps<SVGSVGElement>;

const make =
  (children: ReactNode, opts: { fill?: boolean; viewBox?: string } = {}) =>
  (props: IconProps) => (
    <svg
      viewBox={opts.viewBox ?? "0 0 24 24"}
      fill={opts.fill ? "currentColor" : "none"}
      stroke={opts.fill ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );

export const PlayIcon = make(<path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l12-7.2a.8.8 0 0 0 0-1.4l-12-7.2A.8.8 0 0 0 7 4.8Z" />, {
  fill: true,
});
export const PauseIcon = make(
  <>
    <rect x="6" y="4.5" width="4" height="15" rx="1.2" />
    <rect x="14" y="4.5" width="4" height="15" rx="1.2" />
  </>,
  { fill: true },
);
export const CheckIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const XIcon = make(<path d="M6 6l12 12M18 6 6 18" />);
const arrowPath = <path d="M5 12h14m-6-6 6 6-6 6" />;
const ArrowBase = make(arrowPath);

/** Always points right — use for physical directions (e.g. carousel scrolling). */
export const ArrowRightStaticIcon = ArrowBase;

/** Points "forward": mirrored automatically in right-to-left languages. */
export const ArrowRightIcon = ({ className, ...props }: IconProps) => (
  <ArrowBase className={cn("icon-dir", className)} {...props} />
);
export const ArrowUpIcon = make(<path d="M12 19V5m-6 6 6-6 6 6" />);
export const ChevronDownIcon = make(<path d="m6 9 6 6 6-6" />);
export const MenuIcon = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const StarIcon = make(
  <path d="M12 2.8l2.75 5.78 6.3.86-4.6 4.4 1.15 6.26L12 17.1l-5.6 3 1.15-6.26-4.6-4.4 6.3-.86L12 2.8Z" />,
  { fill: true },
);
export const ShieldIcon = make(
  <>
    <path d="M12 3 4.5 6v5.5c0 4.5 3.1 8.2 7.5 9.5 4.4-1.3 7.5-5 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </>,
);
export const BoltIcon = make(<path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />);
export const TvIcon = make(
  <>
    <rect x="2.5" y="4.5" width="19" height="13" rx="2.5" />
    <path d="M8 21h8M12 17.5V21" />
  </>,
);
export const GridIcon = make(
  <>
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.8" />
    <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.8" />
    <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.8" />
    <rect x="13" y="13" width="7.5" height="7.5" rx="1.8" />
  </>,
);
export const FilmIcon = make(
  <>
    <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
    <path d="M7.5 3.5v17M16.5 3.5v17M3 8h4.5M3 12h4.5M3 16h4.5M16.5 8H21M16.5 12H21M16.5 16H21" />
  </>,
);
export const ClapperIcon = make(
  <>
    <path d="M3.5 10h17v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V10Z" />
    <path d="m3.7 10-.7-3.6a1.5 1.5 0 0 1 1.2-1.8l14.7-2.8a1.5 1.5 0 0 1 1.8 1.2L21 6.4M8 3.4l2.3 4.3M13.6 2.4l2.3 4.3" />
  </>,
);
export const RewindIcon = make(
  <>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
    <path d="M3.5 4.5v4h4M12 7.5V12l3 2" />
  </>,
);
export const CalendarIcon = make(
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </>,
);
export const HeadsetIcon = make(
  <>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13.5" width="4.5" height="6" rx="1.8" />
    <rect x="16.5" y="13.5" width="4.5" height="6" rx="1.8" />
    <path d="M19 19.5c0 1.4-1.6 2-4 2h-2" />
  </>,
);
export const GlobeIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9S14.600 18.400 12 21c-2.600-2.600-3.900-5.600-3.900-9S9.400 5.600 12 3Z" />
  </>,
);
export const DevicesIcon = make(
  <>
    <rect x="2.5" y="5" width="14" height="10" rx="2" />
    <path d="M6 18.5h7M9.500 15v3.500" />
    <rect x="17.500" y="9" width="4" height="9" rx="1.200" />
  </>,
);
export const SparklesIcon = make(
  <>
    <path d="M12 3l1.7 4.8L18.5 9.500l-4.800 1.700L12 16l-1.700-4.800L5.500 9.500l4.800-1.700L12 3Z" />
    <path d="M19 15l.8 2.200L22 18l-2.200.8L19 21l-.8-2.200L16 18l2.200-.8L19 15Z" />
  </>,
);
export const LockIcon = make(
  <>
    <rect x="4.500" y="10.500" width="15" height="10" rx="2.500" />
    <path d="M8 10.500V8a4 4 0 0 1 8 0v2.500" />
  </>,
);
export const ClockIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </>,
);
export const BallIcon = make(
  <>
    <circle cx="12" cy="12" r="9.200" />
    <path d="m12 8.200 3.500 2.500-1.300 4.100H9.800L8.500 10.700 12 8.200Z" />
    <path d="M12 8.200V3M15.500 10.700l4.900-1.600M14.200 14.800l3 4.100M9.800 14.800l-3 4.100M8.500 10.700 3.600 9.100" />
  </>,
);
export const TrophyIcon = make(
  <>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 6H4.500v1.500A3.500 3.500 0 0 0 8 11M16 6h3.500v1.500A3.500 3.500 0 0 1 16 11M12 13v4M8.500 20.500h7M9.500 17h5v3.500h-5z" />
  </>,
);
export const SignalIcon = make(<path d="M4 19v-3M9 19v-7M14 19V8M19 19V4" />);
export const DownloadIcon = make(<path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />);
export const MailIcon = make(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2.500" />
    <path d="m4 7 8 6 8-6" />
  </>,
);
export const ChatIcon = make(
  <path d="M5 5h14a2 2 0 0 1 2 2v8.500a2 2 0 0 1-2 2h-6.500L8 21v-3.500H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
);
export const VolumeIcon = make(
  <>
    <path d="M4 9.500h3.200L12 5.500v13l-4.800-4H4v-5Z" />
    <path d="M15.500 9a4.200 4.200 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11" />
  </>,
);
export const ExpandIcon = make(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />);
export const RefreshIcon = make(
  <>
    <path d="M20 11a8 8 0 0 0-14.500-3.500M4 4v4h4" />
    <path d="M4 13a8 8 0 0 0 14.500 3.500M20 20v-4h-4" />
  </>,
);
export const TagIcon = make(
  <>
    <path d="M3.500 12.500V4.500a1 1 0 0 1 1-1h8l8 8-9 9-8-8Z" />
    <circle cx="8" cy="8" r="1.200" />
  </>,
);

/* Social glyphs (filled) */
export const XSocialIcon = make(
  <path d="M17.700 3h3.100l-6.800 7.700L22 21h-6.300l-4.900-6.400L5.200 21H2.100l7.300-8.300L2 3h6.400l4.400 5.800L17.700 3Zm-1.100 16.200h1.700L7.500 4.700H5.700l10.900 14.500Z" />,
  { fill: true },
);
export const InstagramIcon = make(
  <>
    <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.200" cy="6.800" r="0.600" fill="currentColor" />
  </>,
);
export const YoutubeIcon = make(
  <>
    <rect x="2.500" y="5" width="19" height="14" rx="4.500" />
    <path d="m10 9.200 5 2.800-5 2.800V9.200Z" fill="currentColor" />
  </>,
);
export const TelegramIcon = make(<path d="M21 4 3 11.200l5.500 2 2 6 3-3.800 4.800 3.600L21 4ZM8.500 13.200 17.500 7.500" />);

/* Brand glyphs (filled) */
export const WhatsAppIcon = make(<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />, { fill: true });
export const FacebookIcon = make(<path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />, { fill: true });
