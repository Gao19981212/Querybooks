<template>
  <div>
    <div class="head">
      <van-row :gutter="20">
        <van-col :span="2">
          <div class="menu"><van-button @click="Openmenu()"></van-button></div>
        </van-col>
        <van-col :span="22"
          ><van-search
            v-model="searchtxt"
            show-action
            label="书名/作者"
            shape="round"
            background="#555"
            class="searchstyle"
            placeholder="请输入搜索关键词"
        >  <template #action>
    <div @click="onSearch" style="color:#f7f7f7">搜索</div>
  </template></van-search>
      
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <van-row>
        <van-col :span="20" :offset="2">
          <div style="overflow: auto" v-for="item in pagebooks" :key="item.id">
            <dl>
              <dt @click="showstore(item.booksname)">
                <van-image class="Image" fit="cover" :src="item.url" :style="{width:layoutwidth*0.35+'px',height:layoutwidth*0.35*1.44+'px'}" />
              </dt>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                ISBN：<span>{{ item.ISBN }}</span>
              </dd>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                书名：
                <span style="color: #494949; font-weight: bold">{{
                  item.booksname
                }}</span>
              </dd>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                索书号：<span>{{ item.ssh }}</span>
              </dd>

              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                作者：<span style="color: #009ad6">{{ item.writer }}</span>
              </dd>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                出版社：<span>{{ item.cbs }}</span>
              </dd>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                出版日期：<span>{{ item.cbdate }}</span>
              </dd>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                定价：￥<span style="color: #6950a1">{{
                  item.price.toFixed(2)
                }}</span>
              </dd>
              <dd :style="{fontSize:layoutwidth*0.032+'px',height:layoutwidth*0.066+'px'}">
                架位号：<span style="color: #99cc33">{{ item.numpage }}</span>
              </dd>
            </dl>
            <div style="clear: both"></div>
            <van-divider />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="footer">
      <van-pagination
        v-model="current"
        :total-items="total"
        :items-per-page="pagesize"
        mode="simple"
        class="divipage"
        @change="page_click"
      />
    </div>
    <van-popup
      v-model="popupVisible"
      closeable
      close-icon="arrow"
      position="left"
      class="popupstyle"
      :round="true"
    >
      <van-sticky>
        <van-nav-bar title="选择类别" />
      </van-sticky>
      <div class="liststyle" v-for="(item, index) in querytype" :key="index">
        <van-divider />
        <h3>{{ item.type }}</h3>
        <van-row>
          <van-col>
            <div v-for="itemchild in item.name" :key="itemchild">
              <ul>
                <li
                  :class="selectType == itemchild ? 'activetag' : 'tag'"
                  @click="click_name(itemchild)"
                >
                  {{ itemchild }}
                </li>
              </ul>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-popup>
    <van-popup
      v-model="tro_visible"
      :round="true"
      closeable
      close-icon="close"
      class="txtstyle"
    >
      <div>
        <p>{{ selectname }}的内容简介</p>
        <p>
          哥白尼提出了“日心说”，我们才知道这个世界并不是宇宙的中心。
          哈勃用望远镜揭开了河外星系的神秘面纱，我们才知道宇宙中还有千亿个银河系。
          “自由号”发现了黑洞的存在，我们才知道也许宇宙之外还有宇宙，我们只是永恒中一颗微小的沙粒。
        </p>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchtxt: "",
      layoutwidth: 0,
      total: 0,
      pagesize: 5,
      current: 1,
      books: [],
      pagebooks: [],
      querytype: [
        {
          type: "A类",
          name: [
            "马克思主义",
            "列宁主义",
            "毛泽东思想",
            "邓小平理论",
            "恩格斯著作",
            "列宁著作",
            "斯大林著作",
          ],
        },
        {
          type: "B类",
          name: ["哲学", "世界哲学", "中国哲学", "亚洲哲学", "宗教"],
        },
        {
          type: "C类",
          name: ["社会科学总论"],
        },
        {
          type: "D类",
          name: ["政治", "法律"],
        },
        {
          type: "E类",
          name: ["军事"],
        },
        {
          type: "F类",
          name: ["经济"],
        },
        {
          type: "G类",
          name: ["文化", "科学", "教育", "体育"],
        },
        {
          type: "H类",
          name: ["语言", "文字"],
        },
        {
          type: "I类",
          name: ["文学"],
        },
        {
          type: "J类",
          name: ["艺术"],
        },
        {
          type: "K类",
          name: ["历史", "地理"],
        },
        {
          type: "N类",
          name: ["自然科学总论"],
        },
        {
          type: "O类",
          name: ["数理科学和化学"],
        },
        {
          type: "P类",
          name: ["天文学", "地球科学"],
        },
        {
          type: "Q类",
          name: ["生物科学"],
        },
        {
          type: "R类",
          name: ["医药", "医药卫生"],
        },
        {
          type: "S类",
          name: ["农业科学"],
        },
        {
          type: "T类",
          name: ["工业技术"],
        },
        {
          type: "U类",
          name: ["交通运输"],
        },
        {
          type: "V类",
          name: ["航空航天"],
        },
        {
          type: "X类",
          name: ["环境科学", "安全科学"],
        },
        {
          type: "Z类",
          name: ["综合性图书"],
        },
      ],
      selectType: "",
      popupVisible: false,
      selectname: "",
      tro_visible: false,    
    };
  },
  mounted() {
    Window.title = "图书查询";
    this.screenwidth();
    this.showdata();       
  },

  methods: {
    onSearch(){
    console.log(this.searchtxt);
    
    },
    showstore(name) {
      this.selectname = name;
      this.tro_visible = true;
    },
    click_name(name) {
      if (this.selectType == "") {
        this.selectType = name;
      } else {
        this.selectType = "";
      }
      console.log(this.selectType);
    },
    handleClose(done) {
      done();
    },
    Openmenu() {
      this.popupVisible = true;
    },
    showdata() {
      this.books = [
        {
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: "A123",
          price: 68.0,
        },
        {
          url: require("../assets/Image/books2.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘1",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: "A123",
          price: 68.0,
        },
        {
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘2",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: "A123",
          price: 68.0,
        },
        {
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘3",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: "A123",
          price: 68.0,
        },
        {
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘4",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: "A123",
          price: 68.0,
        },
        {
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘5",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: "A123",
          price: 68.0,
        },
      ];
      this.total = this.books.length;
      this.pagebooks = this.books;
      for (var i = 0; i < this.books.length; i++) {
        this.pagebooks[i]["key"] = i + 1;
      }
      this.pagebooks = this.books.slice(
        (this.current - 1) * this.pagesize,
        this.pagesize * this.current
      );
    },
    index(index) {
      console.log(index);
    },
    //点击页数
    page_click(current) {
      this.current = current;
      this.showdata();
    },

    //屏幕大小调整
    screenwidth() {
      this.layoutwidth = document.body.clientWidth;
      window.onresize = () => {
        return (() => {
          this.layoutwidth = document.body.clientWidth;
        })();
      };
    },
  },
};
</script>
<style  lang="less">
@fontsize: 16px;
@center: center;
@imgwidth: 8rem;
@navheight: 3.5rem;
* {
  margin: 0px;
  padding: 0px;
}
body {
  font-size: @fontsize;
  font-family: "正黑";
  background: #fdffff;
}
.head {
  height: @navheight;
  width: 100%;
  background: #555;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 0 15px #a1a3a6;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  display: table;
  .menu {
    padding: 10px 0px 0px 10px;
    .van-button {
      width: 32px;
      height: 32px;    
      background-image: url("../assets/Image/菜单 (1).png");
      background-repeat: no-repeat;
      background-size: cover;
      outline: none !important;
    }
  }
  .searchstyle {
    height: @navheight;
  }
}
.content {
  width: 100%;
  z-index: -1;
  margin-top: 4.5rem;
  padding-bottom: 3rem;
  div dl {
    clear: both;
    dt {
      float: left;
      clear: both;
      .Image {
        // width: @imgwidth;
        // height: @imgwidth*1.44;
        cursor: pointer;
        pointer-events: none;
      }
    }
    dd {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      font-size: 0.6rem;
      padding-left: 1rem;
    //  height: 25px;
      // margin-bottom: 8.5px;
    }
    span {
      color: #181d4b;
    }
  }
}
.footer {
  width: 100%;
  height: @navheight;
  background: #555;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0 0 15px #a1a3a6;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  .divipage {
    padding-top: 0.5rem;
    width: 100%;
    transform: scale(0.9);
    margin: 0 auto;
    //上一页，下一页样式
    .van-pagination__prev,
    .van-pagination__next {
      background: #fcfcfc;
      color: #6c6c6c;
    }
    .van-pagination__page-desc {
      color: aliceblue;
    }
  }
}
.popupstyle {
  width: 75%;
  // height: 100vh;
}
.liststyle {
  width: 100%;
  h3 {
    color: #003366;
    margin-left: 10px;
  }
  .van-col {
    div {
      margin-left: 5px;
      margin-top: 10px;
      float: left;
      ul li {
        list-style: none;
      }
      .tag {
        margin-left: 5px;
        padding: 10px;
        background: #f7f7f7;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 14px;
      }
      .activetag {
        margin-left: 5px;
        padding: 10px;
        background: #ff9900;
        margin-bottom: 10px;
        border-radius: 4px;
        color: #f7f7f7;
        font-size: 14px;
      }
    }
  }
}
.txtstyle {
  border-radius: 15%;
  width: 300px;
  height: 300px;
  overflow: auto;
  background: #fdffff;
  display: table;
  div {
    display: table-cell;
    vertical-align: middle;
  }
  :nth-child(1) {
    text-align: center;
    color: #007722;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  :nth-of-type(2) {
    width: 90%;
    margin:0 auto;
    text-indent: 1.6rem;
    font-size: 0.8rem;
    color: #181d4b;
    line-height: 1.8rem;
  }
}
</style>