import axios from "axios";
import { Duration } from "luxon";
import { v4 } from "uuid"

export default class FakeTerminal {
    constructor(main) {
        this.main = main;
        this.wline = "";
        this.init_date = new Date();
        this.running_cmd = false
    }

    ready() {
        this.main.terminal.write("\x1b[32m➜\x1b[0m \x1b[36m~\x1b[0m ")
    }

    async cmd_process(cmd, args, handle_return) {
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
                    this.main.terminal.writeln("Not ready yet :3")
                    break;
                }
                case "whoami": {
                    this.main.terminal.writeln("nobody")
                    this.main.terminal.writeln("↳ I don't know who you are? unless you want me to 👉 👈")
                    break;
                }
                case "cat": {
                    if (args.length === 0) {
                        this.main.terminal.writeln("Please enter a file name with command")
                        break;
                    }
                    if (["aboutme", "help", "motd"].includes(args[0])) {
                        this.cmd_process(args[0], [], false)
                    } else if (args[0] === "passwords_hidden") {
                        for (let i = 500; i--;)
                            this.main.terminal.writeln("A")
                        this.main.terminal.writeln("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        this.main.terminal.writeln("Access denied")
                        this.main.terminal.writeln("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                        this.main.terminal.writeln("😳")
                    } else {
                        this.main.terminal.writeln("File does not exist")
                    }
                    break;
                }
                case "ls":
                case "dir": {
                    this.main.terminal.writeln("aboutme help motd passwords_hidden")
                    break;
                }
                case "echo": {
                    this.main.terminal.writeln(args.join(" "))
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
                        'whoami                         Current user?',
                        'dir | ls                       List directory',
                        'echo                           echo echo echo',
                        'cat                            read out files :)'
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
                        '~ Born and raised in New York (Yes I have a shitty accent ~_~)',
                        '~ I\'ve been self taught ontop of going to school for linux/windows administration for the last 8+ years',
                        '~ I\'m a protogen, \x1b[3mSorry\x1b[0m',
                    ].join('\n\r'));
                    break;
                }
                case "ifconfig": {
                    let ip = await axios.get(`/api/ip?t=${Date.now()}`)
                    this.main.terminal.writeln([
                        'ppp0: Link encap:Point-Point Protocol',
                        `        inet ${ip.data['ip']}`,
                        '        RX packets 2742222  bytes 260133075 (260.1 MB)',
                        '        RX errors 0  dropped 0  overruns 0  frame 0',
                        '        TX packets 4076  bytes 305470 (305.4 KB)',
                        '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
                        '        \x1b[3mLike I\'m giving my info, loser  >:D\x1b[0m',
                        ''
                    ].join('\n\r'));
                    break;
                }
                default: {
                    this.main.terminal.writeln(`${cmd}: command not found`);
                    break;
                }
            }
        if (handle_return) {
            this.running_cmd = false
            this.ready()
        }
    }

    onKey(e) {
        if (this.running_cmd)
            return
        switch (e.domEvent.code) {
            case "Enter":
                this.main.terminal.write('\r\n');
                this.running_cmd = true
                let cmd = this.wline.split(" ");
                this.cmd_process(cmd[0], cmd.filter(e => e !== cmd[0]), true);
                this.wline = "";
                break;
            case "Backspace":
                if (this.wline.length !== 0) {
                    this.wline = this.wline.slice(0, this.wline.length - 1)
                    this.main.terminal.write('\b \b');
                }
                break;
            case "KeyC":
                if (e.domEvent.ctrlKey) {
                    for (let i = 2; i--;)
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
