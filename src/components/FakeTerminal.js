
// '  Hi! I\'m Nadie, A sysadmin, developer, community admin \x1b[3mprotogen\x1b[0m  ',
//     '  ↳ for the last 7+ years!',

import { Duration } from "luxon";
import {v4} from "uuid"

function random_ip(type) {
    let end;
    switch (type) {
        case "netmask":
            end = 0
            break
        case "broadcast":
            end = 255
            break
        default:
            end = (Math.floor(Math.random() * 255))
            break
    }

    return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+end;
}


export default class FakeTerminal {
    constructor(main) {
        this.main = main;
        this.wline = "";
        this.init_date = new Date();
    }

    ready() {
        this.main.terminal.write("\x1b[32m➜\x1b[0m \x1b[36m~\x1b[0m ")
    }

    cmd_process(cmd, args) {
        if (cmd)
            switch (cmd) {
                case "motd": {
                    this.main.IntroMsg()
                    break;
                }
                case "uptime": {
                    this.main.terminal.writeln("Uptime: " + Duration.fromObject({ milliseconds: new Date() - this.init_date }).toHuman({ listStyle: "long" }))
                    break;
                }
                case "uname": {
                    if (!args.includes('-a')) {
                        this.main.terminal.writeln("FakeTerminal");
                    } else {
                        this.main.terminal.writeln(`FakeTerminal web-${v4().split("-")[0]} FakeTerminal-notreal #1 SMP ${new Date()} web web web hackerjef/nadie.dev`)
                    }
                    break;
                }
                case "cls":
                case "clear":
                case "exit": {
                    this.main.terminal.clear()
                    this.main.terminal.write('\x1b[2K\r')
                    this.main.IntroMsg()
                    break;
                }
                case "linux": {
                    // this.main.terminal.writeln("Starting v86 with buildroot, Please forgive me as this may take a sec~")
                    // this.main.term_mode = "linux"
                    // this.main.v86Terminal.ready()
                    // No return, just break out fully and wait for v86
                    this.main.terminal.writeln("Not ready yet :3")
                    break;
                }
                case "whoami": {
                    this.main.terminal.writeln("nobody")
                    this.main.terminal.writeln("↳ I don't know who you are? unless you want me to 👉 👈")
                    break;
                }
                case "help": {
                    this.main.terminal.writeln([
                        `Faketerminal uwu, version ${v4().split("-")[0]}-release (web)`,
                        '',
                        `Current commands:`,
                        `motd                           Message of the day`,
                        `uptime                         How long have you been browsing my page`,
                        `uname                          Kernel version of site`,
                        `exit | cls | clear             Cleans terminal`,
                        `help                           what do you think it does?`,
                        `about | aboutme                my about me~`,
                        `linux                          Fuck around and find out~`,
                        `ifconfig                       Interface info for the website`,
                    ].join('\n\r'));
                    break;
                }
                case "aboutme":
                case "about": {
                    this.main.terminal.writeln([
                        '',
                        'Hello!!',
                        '',
                        'I\'m Nadie, I\'m a sysadmin with a passion for computing and making things!',
                        'I\'m a student, bot dev, administrator, moderator in different communities on discord, steam and Minecraft for the last 7+ years',
                        '',
                        'Little tidbits about me~',
                        '',
                        '~ I go by he/him/they/them pronouns',
                        ' \x1b[3m ↳ Though I don\'t fully mind being called any pronouns just keep it respectfull!\x1b[0m',
                        '~ I\'m very shy - most times you see me just in the background watching and looking but please feel free to say hi!',
                        '~ Born and raised in New york (Yes I have a shitty accent ~_~)',
                        '~ I\'ve been self taught ontop of going to school for linux/windows administration for the last 8+ years',
                        '~ I\'m a protogen, \x1b[3mSorry\x1b[0m',
                    ].join('\n\r'));
                    break;
                }
                case "ifconfig": {
                    this.main.terminal.writeln([
                        'ppp0: Link encap:Point-Point Protocol',
                        `        inet ${random_ip()}  netmask ${random_ip("netmask")}  broadcast ${random_ip("broadcast")}`,
                        '        RX packets 2742222  bytes 260133075 (260.1 MB)',
                        '        RX errors 0  dropped 0  overruns 0  frame 0',
                        '        TX packets 4076  bytes 305470 (305.4 KB)',
                        '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
                        '        \x1b[3mLike I\'m giving that away, loser >:D\x1b[0m',
                        ''
                    ].join('\n\r'));
                    break;
                }
                default: {
                    this.main.terminal.writeln(`${cmd}: command not found`);
                    break;
                }
            }
        this.ready()
    }

    onKey(e) {
        switch (e.domEvent.code) {
            case "Enter":
                this.main.terminal.write('\r\n');
                let cmd = this.wline.split(" ");
                this.cmd_process(cmd[0], cmd.filter(e => e !== cmd[0]));
                this.wline = "";
                break;
            case "Backspace":
                if (this.wline.length !== 0) {
                    this.wline = this.wline.slice(0,this.wline.length - 1)
                    this.main.terminal.write('\b \b');
                }
                break;
            case "KeyC":
                if (e.domEvent.ctrlKey) {
                    for( let i=2; i--; )
                        this.main.terminal.writeln("\n")
                    this.main.terminal.writeln("Ctrl-C hit, reloading page")
                    window.location.reload()
                    break
                }
                this.main.terminal.write(e.key);
                this.wline = this.wline + e.key;
                break;
            // ignore some
            // eslint-disable-next-line no-fallthrough
            case "Tab":
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight": {
                return;
            }
            // eslint-disable-next-line no-fallthrough
            default:
                this.main.terminal.write(e.key);
                this.wline = this.wline + e.key;
        }
    }
}
