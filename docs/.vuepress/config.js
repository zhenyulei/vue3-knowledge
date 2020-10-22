module.exports = {
    title: '学习vue3',
    description: 'Just playing around',
    head: [
        ['link', {
            rel: 'icon',
            href: `/favicon.ico`
        }]
    ],
    dest: './docs/.vuepress/dist',
    evergreen: true,
    themeConfig:{
        nav:[
            {text:'Home',link:'/'},
            {text:'github',link:'/vuebased/'},
            {text:'设置侧边栏文档',link:'https://blog.csdn.net/wq_ocean_/article/details/109220650'}
        ],
        sidebarDepth: 0,
        sidebar: {
            '/vuebased/':[
                {
                    title:"基础配置",
                    children:[
                        '',
                        ['newStatus','2.使用了新特性']
                    ]
                }
            ]
        }
    },

}