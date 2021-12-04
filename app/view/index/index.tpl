{% set body_class = "home" %}

{% extends "../layout/_layout.tpl" %}

{% block content %}

<div class="content">
    <div class="content-box">
        <div class="content-left">
            <div class="content-crumbs">
                <div>当前位置：<span>contentData.name</span></div>
            </div>
            <div class="content-main">
                <section class="content-item">
                    <a class="content-img">
                        <img class="img" src="../../public/image/static/vue.jpg" />
                    </a>
                    <div class="content-base-box">
                        <h2 class="content-name-box">
                            <a>
                                <span class="content-type">Vue</span>
                                Vue 3.0 初体验《从构建项目到实现一个todoList》
                            </a>
                        </h2>
                        <p class="c-intro">
                            关于Vue 3.0 Beta版本已经发布有一段时间了，不知道各位朋友有没有去体验一下最新版本。如果还没有来的及体验的话，那么今天我来带你们一起体验一下Vue3.0
                            Beta带来的快感吧。
                            关于Vue 3.0 Beta版本已经发布有一段时间了，不知道各位朋友有没有去体验一下最新版本。如果还没有来的及体验的话，那么今天我来带你们一起体验一下Vue3.0
                            Beta带来的快感吧。
                            关于Vue 3.0 Beta版本已经发布有一段时间了，不知道各位朋友有没有去体验一下最新版本。如果还没有来的及体验的话，那么今天我来带你们一起体验一下Vue3.0
                            Beta带来的快感吧。
                        </p>
                        <div class="c-f-num">
                            <span><i class="icon-time iconfont"></i>2020-05-20 10:05:56</span>
                            <span><i class="icon-huoyan iconfont"></i>2025</span>
                            <span><i class="icon-dianzan iconfont"></i>25</span>
                            <span><i class="icon-xiaoxi iconfont"></i>25</span>
                            <a class="to-detail">阅读全文 >></a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
        <div class="content-right">
            <div id="contentDetail" style="visibility: hidden;">{{contentData.content_md}}</div>
            <div id="contentmd"></div>
        </div>
    </div>
</div>
{% endblock %}