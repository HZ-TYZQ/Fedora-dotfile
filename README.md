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

## 当前管理范围

- Niri、Noctalia、Waybar、Swayidle、Swaylock
- Fish、Kitty、Starship
- Neovim、Yazi、Fastfetch
- 用户环境变量、XDG Portal 和用户自启动项

## 明确排除

- 认证信息、凭据、私钥、历史、日志和会话
- `/etc`、GRUB、DNF、Snapper 等系统级配置
- Noctalia 生成的主题片段、Fish 状态和自动生成的补全
- 迁移备份和旧 `.bak` 文件
