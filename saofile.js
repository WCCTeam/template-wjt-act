/**
 * 通用数据初始化
 *
 * @see 百度统计 https://wiki.doc.101.com/index.php?title=网教通-百度统计
 * @see 云图Key https://wiki.doc.101.com/index.php?title=网教通云图KEY
 */
const initData = {
  fj: {
    name: '网教通福建版',
    sdpAppId: 'a33ada46-c6f0-4c9f-9a11-076e29c489c8',
    cloudAppKey: '9cad7013ab0545008e4e4a6e743d2615',
    baiduStat: 'e69cec6f2edc013e7b61bd04067b20c9',
    loginUrl: '',
    unInstallRedirect: 'https://fj.101.com/wjt/fj/rrt/download',
  },
  edu: {
    name: '网教通公共版',
    sdpAppId: '852825c8-53cc-4c7a-a3da-23a3b5a5088c',
    cloudAppKey: 'b3bb67ea17ee425ba5cc6f621e1f8f31',
    baiduStat: '88fe90258b52194f8ce4434129dc8baf',
    loginUrl: '',
    unInstallRedirect: '',
  },
  mvp: {
    name: '网教通开发版',
    sdpAppId: '9c7f56a3-d956-4014-8ffc-4c512c077f38',
    cloudAppKey: '',
    baiduStat: '',
    loginUrl: '',
    unInstallRedirect: '',
  },
  hb: {
    name: '湖北教育云',
    sdpAppId: '9ffacba8-20a4-42e6-8a4f-a42a0287a347',
    cloudAppKey: '500e49fcad8641a68421148e874814e2',
    baiduStat: '0048f268c7608c5348283a58fc711247',
    loginUrl: 'http://new.hbeducloud.com/wjt/hbjyy/login',
    unInstallRedirect: 'http://new.hbeducloud.com/wjt/hbjyy/rrt/download',
  },
  mmrrt: {
    name: '茂名人人通',
    sdpAppId: '',
    cloudAppKey: 'c5626ac600cd472ebd75d5a1a73a46ba',
    baiduStat: '9ad64032c37a54ef093cca421263b755',
    loginUrl: '',
    unInstallRedirect: 'https://gdmm.101.com/wjt/mm/rrt/download',
  }
}

module.exports = {
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
        filter: val => val.toLowerCase()
      },
      {
        name: 'description',
        message: 'How would you descripe the new project',
        default: `my project`
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: this.gitUser.username || this.gitUser.name,
        filter: val => val.toLowerCase(),
        store: true
      },
      {
        type: 'list',
        name: 'projectCodeName',
        message: 'What is your project code name',
        default: 'fj',
        filter: projectCodeName => initData[projectCodeName],
        choices: [
          'fj', 'edu', 'hb', 'mvp', 'mmrrt'
        ],
        required: true
      },
    ]
  },
  actions: [
    {
      type: 'add',
      files: '**',
    },
    {
      type: 'move',
      patterns: {
        '_package.json': 'package.json',
        '_.gitignore': '.gitignore',
        '_README.md': 'README.md',
      }
    }
  ],
  async completed() {
    this.gitInit()
    this.showProjectTips()
  }
}
