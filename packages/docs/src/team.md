<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/jackysoft.png',
    name: '河畔一角',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/JackySoft' },
    ]
  },
  {
    avatar: 'https://www.github.com/waiterxiaoyy.png',
    name: 'Mars啄木鸟',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/waiterxiaoyy' },
    ]
  }
]
</script>

# 我们的团队

我们是一群热爱开源和前端开发的小伙伴，在这里我们聚集了来自对低代码感兴趣的开发者。

<VPTeamMembers size="small" :members="members" />
