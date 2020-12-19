// Postcss配置文件
module.exports = {
  // 配置要使用.Postcss.插件
  plugins: {
    // 配置使用.autoprefixer.插件
    // 作用：生成浏览器.CSS.样式规则前缀
    // autoprefixer: {  // autoprefixer插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    // 配置使用postcss-pxtorem 插件
    // 作用：将px转化为rem
    'postcss-pxtorem': {
      // lib-flexible 的REM 适配方案： 将一行分为10份，每份就是10
      // 所有rootValue应该设置为 设计稿宽度的十分之一
      // 设计稿为 750,所以应该设置为 750 / 10 = 75
      // vant 是基于 375 写的
      // 所以必须设置为37.5，唯一的缺点就是使用我们设计稿的尺寸都必须为37.5
      // 方法：
      // 如果是Vant的样式， 就按照37.5来转换
      // 如果是我们自己的样式，就 按照 75来转换
      // 通过查阅文档，我们发现rootValue 支持两种类型
      //  数字：  固定的数值
      // 函数：可以动态处理返回
      // rootValue: 37.5,
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的CSS属性
      // *表示所有
      propList: ['*'],

      // 配置不需要转化的样式资源
      exclude: 'github-markdown'
    }
  }
}
