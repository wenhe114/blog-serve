{% set body_class = "home" %}
{% set body_title="12121" %}
{% extends "../layout/_layout.tpl" %}

{% block content %}

<div class="content">
    <div class="content-box">
        <div class="content-left">
            <div class="content-crumbs">
                <div>当前位置：<span>{{menu.meun_title}}</span></div>
            </div>
            <div class="content-main">
            {# {{contentData}} #}
            {% if contentData.length>0 %}
                {% for item in contentData %}
                <section class="content-item">
                    <a class="content-img" href="/content/detail/{{id}}/{{item.id}}">
                        <img class="img" src="{{item.img}}" />
                    </a>
                    <div class="content-base-box">
                        <h2 class="content-name-box">
                            <a href="/content/detail/{{id}}/{{item.id}}">
                                <span class="content-type">{{item.tag}}</span>
                                {{item.name}}
                            </a>
                        </h2>
                        <p class="c-intro">
                            {{item.intro}}
                        </p>
                        <div class="c-f-num">
                            <span><i class="icon-time iconfont"></i>{{item.created_at}}</span>
                            <span><i class="icon-huoyan iconfont"></i>{{item.read_num}}</span>
                            <span><i class="icon-dianzan iconfont"></i>{{item.praise_num}}</span>
                            <span><i class="icon-xiaoxi iconfont"></i>{{item.remark_num}}</span>
                            <a class="to-detail" href="/content/detail/{{id}}/{{item.id}}">阅读全文 >></a>
                        </div>
                    </div>
                </section>
            
            {% endfor %}
            {% else %}
            <div>暂无数据</div>
            {% endif %}
            
                

            </div>
        </div>
        <div class="content-right">
            
        </div>
    </div>
</div>
{% endblock %}