<header class="layout-header">
    <div class="pc-nav">
        <span class="layout-logo"><a href="/">文和博客</a></span>
        <div class="layout-nav-box">
            <ul class="f-nav-list">
            {% for item in MenuData %}
                <li class="f-nav-item">
                    
                    {% if item.children.length > 0 %}
                        <span class="f-nav-name">
                            <span class="{{item.icon}} iconfont s-nav-icon"></span>
                            {{ item.meun_title }}
                            <span class="icon-xiala iconfont xiala-icon"></span>
                            <ul class="s-nav-list">
                                 {% for it in item.children %}
                                    <li class="s-nav-item"><a href="{{it.url}}/{{it.id}}"><span class="iconfont {{it.icon}}"></span>{{it.meun_title}}</a></li>
                                 {% endfor %}
                            </ul>
                        </span>
                    {% else %}
                        <span class="f-nav-name">
                            <a href="{{item.url}}">
                                <span class="{{item.icon}} iconfont s-nav-icon"></span>
                                {{ item.meun_title }}
                            </a>
                        </span>
                    {% endif %}
                </li>
            {% endfor %}
                {# <li class="f-nav-item">
                    <span class="f-nav-name"><a href="/"><span class="icon-shouye iconfont s-nav-icon"></span>{{ MenuData }}</a></span>
                </li>
                <li class="f-nav-item">
                    <span class="f-nav-name">
                        <span class="iconfont s-nav-icon icon-WEBqianduan"></span>web前端<span class="icon-xiala iconfont xiala-icon"></span>
                    </span>
                    <ul class="s-nav-list">
                        <li class="s-nav-item"><a><span class="iconfont icon-vuejs"></span>Vue</a></li>
                        <li class="s-nav-item"><a><span class="iconfont icon-typescript"></span>TypeScript</a></li>
                        <li class="s-nav-item"><a><span class="iconfont icon-html"></span>HTML5</a></li>
                        <li class="s-nav-item"><a><span class="iconfont icon-css"></span>CSS3</a></li>
                    </ul>
                </li> #}
            </ul>
        </div>
        <div class="header-right">三</div>
    </div>
    <div class="mobile-nav">
        <span class="nav-title"><a href="/">文和博客</a></span>
        <div class="layout-nav-box" id="mobilenNav">
            <ul class="f-nav-list">
            {% for item in MenuData %}
                <li class="f-nav-item">
                    
                    {% if item.children.length > 0 %}
                        <span class="f-nav-name">
                            <span class="{{item.icon}} iconfont s-nav-icon"></span>
                            {{ item.meun_title }}
                            <span class="icon-xiala iconfont xiala-icon"></span>
                            <ul class="s-nav-list">
                                 {% for it in item.children %}
                                    <li class="s-nav-item"><a href="{{it.url}}/{{it.id}}"><span class="iconfont {{it.icon}}"></span>{{it.meun_title}}</a></li>
                                 {% endfor %}
                            </ul>
                        </span>
                    {% else %}
                        <span class="f-nav-name">
                            <a href="{{item.url}}">
                                <span class="{{item.icon}} iconfont s-nav-icon"></span>
                                {{ item.meun_title }}
                            </a>
                        </span>
                    {% endif %}
                </li>
            {% endfor %}
            </ul>
        </div>
        <div class="header-right" id="openNav">三</div>
        <div class="mask"></div>
    </div>
</header>

