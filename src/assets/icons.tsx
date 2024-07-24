import Svg, { G, Path } from "react-native-svg";

interface SvgProps {
	size?: number;
	color?: string;
}

export const DashboardIcon = ({ size, color }: SvgProps) => {
	return (
		<Svg
			width={size | 24}
			height={size || 23}
			viewBox="0 0 24 24"
			fillRule="evenodd"
			clipRule="evenodd"
			strokeLinejoin="round"
			strokeMiterlimit={2}
		>
			<G transform="matrix(1,0,0,1,-2.99997,-1.5)">
				<Path
					d="M13.003,14C13.553,14 14,13.544 14,13.005L14,4.995C13.997,4.449 13.549,4.002 13.003,4L6.997,4C6.447,4 6,4.456 6,4.995L6,13.005C6.003,13.551 6.451,13.998 6.997,14L13.003,14ZM13.003,23C13.553,23 14,22.562 14,21.997L14,17.003C14,16.449 13.547,16 13.003,16L6.997,16C6.996,16 6.994,16 6.993,16C6.448,16 6,16.448 6,16.993C6,16.996 6,17 6,17.003L6,21.997C6,22.551 6.453,23 6.997,23L13.003,23ZM23.003,23C23.553,23 24,22.555 24,22.004L24,12.996C23.998,12.45 23.549,12.002 23.003,12L16.997,12C16.997,12 16.996,12 16.996,12C16.45,12 16,12.45 16,12.996L16,22.004C16.002,22.55 16.451,22.998 16.997,23L23.003,23ZM16,9.01C16,9.556 16.453,10 16.997,10L23.003,10C23.553,10 24,9.549 24,9.01L24,4.99C23.996,4.446 23.547,4.001 23.003,4L16.997,4C16.453,4.001 16.005,4.446 16,4.99L16,9.01Z"
					fill={color || "#000000"}
				/>
			</G>
		</Svg>
	);
};
