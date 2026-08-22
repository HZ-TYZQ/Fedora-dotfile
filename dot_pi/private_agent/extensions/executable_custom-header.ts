/**
 * Minimal Pi startup header.
 *
 * The logo is stored without ANSI colors and rendered with the active theme,
 * so it remains visually consistent when the Pi theme changes.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { truncateToWidth, visibleWidth } from "@earendil-works/pi-tui";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const AGENT_DIR = process.env.PI_CODING_AGENT_DIR ?? join(homedir(), ".pi", "agent");
const ART_PATH = join(AGENT_DIR, "ASCII", "猫猫_18x10.txt");

// Pi 0.84.1 defaults. Keep this list in sync if keybindings.json is added.
const HINTS: Array<[string, string]> = [
	["esc", "interrupt"],
	["ctrl+c", "clear · twice exit"],
	["ctrl+p", "cycle model"],
	["ctrl+l", "select model"],
	["shift+tab", "thinking level"],
	["/", "commands"],
	["!", "bash"],
];

function loadArt(): string[] {
	try {
		return readFileSync(ART_PATH, "utf8")
			.split(/\r?\n/)
			.map((line) => line.replace(/\x1b\[[0-9;]*m/g, ""))
			.filter((line) => visibleWidth(line) > 0);
	} catch {
		return [];
	}
}

export default function (pi: ExtensionAPI) {
	pi.on("session_start", async (_event, ctx) => {
		if (ctx.mode !== "tui") return;

		const art = loadArt();
		const artWidth = Math.max(0, ...art.map((line) => visibleWidth(line)));

		ctx.ui.setHeader((_tui, theme) => ({
			invalidate() {},
			render(width: number): string[] {
				if (art.length === 0) return [];

				const keyWidth = Math.max(...HINTS.map(([key]) => visibleWidth(key)));
				const hints = HINTS.map(
					([key, description]) =>
						theme.fg("muted", key.padEnd(keyWidth + 2)) + theme.fg("dim", description),
				);
				const hintWidth = Math.max(...hints.map((line) => visibleWidth(line)));
				const gap = 4;
				const showHints = width >= 1 + artWidth + gap + hintWidth;
				const hintTop = Math.floor((art.length - hints.length) / 2);

				const lines: string[] = [""];
				for (let i = 0; i < art.length; i++) {
					const artLine = art[i]!;
					let content = ` ${theme.fg("accent", artLine)}`;

					if (showHints) {
						const pad = " ".repeat(Math.max(0, artWidth - visibleWidth(artLine)) + gap);
						const hint = i >= hintTop && i < hintTop + hints.length ? hints[i - hintTop]! : "";
						content += pad + hint;
					}

					lines.push(truncateToWidth(content, width, ""));
				}
				lines.push("");
				return lines;
			},
		}));
	});

	pi.registerCommand("builtin-header", {
		description: "Hide the custom header for this session",
		handler: async (_args, ctx) => {
			ctx.ui.setHeader(undefined);
			ctx.ui.notify("Custom header hidden for this session", "info");
		},
	});
}
