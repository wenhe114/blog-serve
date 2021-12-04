<html>
  <head>
    <title>文和博客-{{menu.meun_title}}-{{contentData.name}}</title>
    <meta data-n-head="true" name="keywords" content="文和前端博客,web前端博客,web前端开发,Reactjs开发,Vuejs开发,ReactNative开发,Webpack开发配置,Nodejs开发,Python开发,专注全栈技术">
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="/public/css/common.css" />
    <link rel="stylesheet" href="/public/css/layout.css" />
    <link rel="stylesheet" href="/public/iconfont/iconfont.css" />
    <link rel="stylesheet" href="/public/editor/css/editormd.min.css" />
    <link rel="stylesheet" href="/public/editor/css/editormd.preview.min.css" />
<script src="/public/js/jquery-3.5.1.js"></script>
{# <script src="/public/editor/lib/marked.min.js"></script>
<script src="/public/js/md.js"></script> #}
  <body class="body {{ body_class }}">
    {% include "./_header.tpl" %}
    {% block  content %}
      
    {% endblock %}
    {% include "./_footer.tpl" %}
  </body>
</html>

<script>
console.log(111)
      $("#openNav").click(()=>{
        $("#mobilenNav").css("left","40%")
        $(".mask").css("display","block")
      })
      $(".mask").click(()=>{
        $("#mobilenNav").css("left","100%")
        $(".mask").css("display","none")
      })
</script>
