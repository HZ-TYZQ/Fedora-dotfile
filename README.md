# Fedora dotfiles

Personal user-level configuration for Fedora 44 with Niri and Noctalia,
managed by [chezmoi](https://www.chezmoi.io/).

## Bootstrap

```bash
sudo dnf5 install chezmoi
chezmoi init https://github.com/HZ-TYZQ/Fedora-dotfile.git
chezmoi diff
chezmoi apply
```

Review `chezmoi diff` before every apply. System-level configuration and
credentials are deliberately outside this repository.

## Managed scope

- User-maintained files under `~/.config`
- Desktop configuration for Niri and Noctalia
- Terminal, editor, file-manager, prompt, and shell configuration

## Deliberately excluded

- Authentication, credentials, private keys, histories, logs, and sessions
- System-level files such as `/etc`, GRUB, DNF, and Snapper configuration
- Generated theme fragments and generated shell state/completions
- Migration backups and old `.bak` files
