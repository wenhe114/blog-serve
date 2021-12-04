{% set body_class = "home" %}

{% extends "../layout/_layout.tpl" %}

{% block content %}

<div class="content">
    <div class="content-box">
        <div class="content-left">
            <div class="content-crumbs">
                <div>当前位置：<span>{{menu.meun_title}} > {{contentData.name}}</span></div>
            </div>

            <div class="content-main" id="">
                <h2 class="content-title">{{contentData.name}}</h2>
                <div id="contentHtml">
                    <input type="hidden" style="visibility: hidden;display:none" id="contentDetail"
                        value="{{contentData.content}}"></input>
                </div>

                {# {{contentData.content}} #}
            </div>
        </div>
        <div class="content-right">

            {# <div id="contentDetail" style="visibility: hidden;">{{contentData.content}}</div> #}
            <div id="contentmd"></div>
        </div>
    </div>
</div>
{% block script %}
<script>
    console.log($("#contentDetail").val())
    $("#contentHtml").html($("#contentDetail").val())
</script>
{% endblock %}
{% endblock %}