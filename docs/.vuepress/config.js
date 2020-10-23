module.exports = {
    markdown: {
        lineNumbers: true
    },
    title: 'vue3新特性',
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
            {text:'github',link:'https://github.com/zhenyulei/vue3-knowledge'},
            {text:'codeDemo',link:'https://github.com/zhenyulei/vue3-demo'}
        ],
        sidebarDepth: 0,
        sidebar: {
            '/pages/':[
                {
                    title:"新增特性",
                    children:[
                        '',
                        'setup',
                        'proxy',
                        'asyncComponent',
                        'cssinjs',
                        'forKey',
                        'slot',
                        'model',
                        'scoped'
                    ]
                },
                'links'
            ]
        }
    },

}