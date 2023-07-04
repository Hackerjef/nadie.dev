import React from "react"
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import { CanvasAddon } from 'xterm-addon-canvas';
import { Unicode11Addon } from 'xterm-addon-unicode11';

import "xterm/css/xterm.css"
import "../css/terminal.css"

import V86Terminal from "./V86Terminal";
import FakeTerminal from "./FakeTerminal";

export default class main extends React.Component {
    constructor() {
        super();
        this.tref = React.createRef()
        this.term_mode = "fake"

        this.terminal = new Terminal({
            fontFamily: 'courier-new, courier, monospace',
            theme: {
                foreground: '#F8F8F8',
                background: '#2D2E2C',
                selection: '#5DA5D533',
                black: '#1E1E1D',
                brightBlack: '#262625',
                red: '#CE5C5C',
                brightRed: '#FF7272',
                green: '#5BCC5B',
                brightGreen: '#72FF72',
                yellow: '#CCCC5B',
                brightYellow: '#FFFF72',
                blue: '#5D5DD3',
                brightBlue: '#7279FF',
                magenta: '#BC5ED1',
                brightMagenta: '#E572FF',
                cyan: '#5DA5D5',
                brightCyan: '#72F0FF',
                white: '#F8F8F8',
                brightWhite: '#FFFFFF'
            },
            allowProposedApi: true,
            cursorBlink: true,
        });

        this.v86Terminal = new V86Terminal(this)
        this.fakeTerminal = new FakeTerminal(this)
        this.fitAddon = new FitAddon();
        this.CanvasAddon = new CanvasAddon();
        this.weblinkAddon = new WebLinksAddon();
        this.unicode11Addon = new Unicode11Addon();
        this.resizeObserver = new ResizeObserver(this.DidResize);
    }

    componentDidMount() {
        console.log("Loaded");
        this.resizeObserver.observe(this.tref);
        this.terminal.open(this.tref)
        this.terminal.focus()

        this.terminal.loadAddon(this.fitAddon);
        this.terminal.loadAddon(this.weblinkAddon);
        this.terminal.loadAddon(this.CanvasAddon);
        this.terminal.loadAddon(this.unicode11Addon);

        this.weblinkAddon.activate(this.terminal)
        this.CanvasAddon.activate(this.terminal)
        this.fitAddon.fit();

        this.terminal.unicode.activeVersion = '11';

        this.terminal.onData((data) => {
            if (this.term_mode === "v86") {
                return this.v86Terminal.ondata(data)
            }
        })


        this.terminal.onKey((e) => {
            if (this.term_mode === "fake") {
                switch (e.domEvent.key) {
                    case "F5":
                        return window.location.reload()
                    default: {
                        return this.fakeTerminal.onKey(e)
                    }
                }
            }
        })

        this.IntroMsg()
        if (this.term_mode === "fake")
            this.fakeTerminal.ready()
    }

    DidResize(e) {
        if (this.fitAddon && this.terminal) {
            this.fitAddon.fit()
        }
    }

    IntroMsg() {
        this.terminal.writeln([
            '',
            'Welcome to NadieLabs, It\'s safer here.',
            '',
            '┌ \x1b[1mSocals\x1b[0m ────────────────────────────────────────────────────────────────────┐',
            '│                                                                            │',
            '│  Github:  https://github.com/Hackerjef                                     │',
            '│                                                                            │',
            '│  Twitter: https://twitter.com/hackerjef                                    │',
            '│                                                                            │',
            '│  Bsky: https://bsky.app/profile/nadie.bsky.social                          │',
            '│                                                                            │',
            '│  Mastodon: https://wuff.space/@Nadie                                       │',
            '│                                                                            │',
            '│  Discord Server: https://d.nadie.dev/join                                  │',
            '│                                                                            │',
            '│  Discord: nadie  (Used to be Nadie#0063)                                   │',
            '│                                                                            │',
            '└────────────────────────────────────────────────────────────────────────────┘',
            '',
            'To find out about me please type aboutme or type help for more commands!',
            '\x1b[3m ↳ If you want something special type linux ;)\x1b[0m',
            '',
        ].join('\n\r'));
    }


    render() {
        return (<div ref={(tref) => { this.tref = tref }} id={"terminal"}></div>)
    }
}
