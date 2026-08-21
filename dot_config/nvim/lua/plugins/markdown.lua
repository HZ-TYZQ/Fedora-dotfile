return {
  -- 关闭 lang.markdown extra 自带的 markdownlint 诊断（Markdown 里红色波浪线的来源）
  {
    "mfussenegger/nvim-lint",
    opts = function(_, opts)
      opts.linters_by_ft.markdown = {}
    end,
  },
}
