# Fedora dotfiles

使用 [chezmoi](https://www.chezmoi.io/) 和 Git 管理的 Fedora 44 用户级配置，
主要面向 Niri + Noctalia 桌面环境。

## 快速开始

```bash
sudo dnf5 install chezmoi
chezmoi init https://github.com/HZ-TYZQ/Fedora-dotfile.git
chezmoi diff
chezmoi apply
```

执行 `apply` 前务必检查 `chezmoi diff`。完整的安装、日常维护、同步、冲突处理、
配置回退和安全边界说明见：[中文操作指南](docs/使用指南.md)。

## 配置来源

`~/.local/share/chezmoi` 是用户配置的唯一长期来源，家目录是程序实际读取的部署
结果。不要再维护独立的 Niri、Noctalia 等配置副本；如直接修改家目录，应使用
`chezmoi re-add` 将确认后的变化收回源目录。

历史系统变更见：[系统变更记录](docs/系统变更记录.md)。

## 当前管理范围

- Niri、Noctalia、Waybar、Swayidle、Swaylock
- Fish、Kitty、Starship
- Neovim、Fastfetch
- 用户环境变量、XDG Portal 和用户自启动项

## 明确排除

- 认证信息、凭据、私钥、历史、日志和会话
- Yazi（`~/.config/yazi`）和 Pi Agent（`~/.pi/agent`）的配置：2026-09-21 已用
  `chezmoi forget` 退出纳管，改为纯本地维护（两者都有各自的写入方，纳管只会持续
  产生冲突）
- Pi Agent 的 `auth.json`、运行历史、模型缓存、npm 依赖和其他未列入白名单的文件
- `/etc`、GRUB、DNF、Snapper 等系统级配置
- Noctalia 生成的主题片段、Fish 状态和自动生成的补全
- 迁移备份和旧 `.bak` 文件
- VPN 配置、连接日志、实验目录和旧 `systemconfig` 归档
