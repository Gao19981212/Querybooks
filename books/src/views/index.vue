<template>
  <div>
    <div class="head">
      <div class="headcontent">
        <el-row>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-button class="menu" @click="Openmenu()"> </el-button>
          </el-col>
          <el-col :xs="21" :sm="21" :md="21" :lg="21" :xl="21">
            <el-input placeholder="请输入内容" size="small "  v-model="searchtxt" clearable>
              <el-select
                v-model="searchselect"
                slot="prepend"             
                class="selectvalue"
              >
                <el-option label="全部" value="0"></el-option>
                <el-option label="书名" value="1"></el-option>
                <el-option label="作者" value="2"></el-option>
              </el-select>
              <el-button slot="append">
                <img src="../assets/Image/搜索 (2).png" width="24" height="24">
              </el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content">
      <el-row>
        <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19" :push="2">
          <div style="overflow: auto">
            <dl v-for="item in books" :key="item.id">
              <dt>
                <el-image :src="item.url" fit="fill"></el-image>
              </dt>
              <dd>
                ISBN：<span>{{ item.ISBN }}</span>
              </dd>
              <dd>
                书名：
                <span style="color: #494949; font-weight: bold">{{
                  item.booksname
                }}</span>
              </dd>
              <dd>
                索书号：<span>{{ item.ssh }}</span>
              </dd>
              <dd>
                作者：<span style="color: #009ad6">{{ item.writer }}</span>
              </dd>
              <dd>
                出版社：<span>{{ item.cbs }}</span>
              </dd>
              <dd>
                出版日期：<span>{{ item.cbdate }}</span>
              </dd>
              <dd>
                页数：<span style="color:#99CC33">{{ item.numpage }}</span>
              </dd>
              <dd>
                定价：￥<span style="color: #6950a1">{{
                  item.price.toFixed(2)
                }}</span>
              </dd>
            </dl>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <a-pagination
        :default-current="current"
        show-size-changer
        v-model="current"
        :pageSize="pagesize"
        :total="total"
        :item-render="itemRender"
        @change="page_click"
        class="divipage"
      />
    </div>
    <el-drawer
  :visible.sync="drawer"
  direction="ltr"
  wrapperClosable
  size="75%"
  class="menustyle"
  :before-close="handleClose">
  <span slot="title" style="color:#666666;font-weight:bold">分类查询</span>

 <div class="liststyle" v-for="(item,index) in querytype" :key="index"> 
   <h3>{{item.type}}</h3>
  <el-row>
    <el-col>    
   <div v-for="itemchild in item.name" :key="itemchild"><span :class="selectType==itemchild?'activetag':'tag'" @click="click_name(itemchild)" >{{itemchild}}</span></div>
    </el-col>
  </el-row>
  </div>
</el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchtxt: "",
      searchselect: "全部",
      layoutwidth: 0,
      total: 0,
      pagesize: 3,
      current: 1,
      loading: false,
      books: [],
      drawer:false,
     
      querytype:[
        {
       type:"A类",
       name:["马克思主义","列宁主义","毛泽东思想","邓小平理论"]
      },
      {
       type:"B类",
       name:["哲学","宗教"]
      },
      {
       type:"C类",
       name:["社会科学总论"]
      },
       {
       type:"D类",
       name:["政治","法律"]
      },
      {
       type:"E类",
       name:["军事"]
      },
      {
       type:"F类",
       name:["经济"]
      },
      {
       type:"G类",
       name:["文化","科学","教育","体育"]
      },
       {
       type:"H类",
       name:["语言","文字"]
      },
      {
       type:"I类",
       name:["文学"]
      },
      {
       type:"J类",
       name:["艺术"]
      },
      {
       type:"K类",
       name:["历史","地理"]
      },
       {
       type:"N类",
       name:["自然科学总论"]
      },
      {
       type:"O类",
       name:["数理科学和化学"]
      },
      {
       type:"P类",
       name:["天文学","地球科学"]
      },
      {
       type:"Q类",
       name:["生物科学"]
      },
       {
       type:"R类",
       name:["医药","医药卫生"]
      },
       {
       type:"S类",
       name:["农业科学"]
      },
       {
       type:"T类",
       name:["工业技术"]
      },
       {
       type:"U类",
       name:["交通运输"]
      },
       {
       type:"V类",
       name:["航空航天"]
      },
        {
       type:"X类",
       name:["环境科学","安全科学"]
      },
        {
       type:"Z类",
       name:["综合性图书"]
      },
      ],
      selectType:"",
        
    };
  },
  mounted() {
    Window.title = "图书查询";
    this.screenwidth();
    this.showdata();
  },

  methods: {
  click_name(name){

    // this.theme="dark";
 this.selectType=name;

  },
    handleClose(done){
      done();
    },
    Openmenu(){
     this.drawer=true;
    },
    showdata() {
      this.books = [
        {
          id: 0,
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: 632,
          price: 68.0,
        },
        {
          id: 1,
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: 632,
          price: 68.0,
        },
        {
          id: 2,
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: 632,
          price: 68.0,
        },
        {
          id: 3,
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: 632,
          price: 68.0,
        },
        {
          id: 4,
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: 632,
          price: 68.0,
        },
        {
          id: 5,
          url: require("../assets/Image/books1.jpg"),
          ISBN: "9787539967363",
          booksname: "沙丘",
          ssh: "A11/1",
          writer: "[美] 弗兰克·赫伯特",
          cbs: "江苏凤凰文艺出版社",
          cbdate: "2017",
          numpage: 632,
          price: 68.0,
        },
      ];
      this.total = this.books.length;
    },
    //点击页数
    page_click(current, pageSize) {
      this.current = current;
      this.pagesize = pageSize;
    },
    itemRender(current, type, originalElement) {
      if (type === "prev") {
        return <a class="prev">上一页</a>;
      } else if (type === "next") {
        return <a class="next">下一页</a>;
      }
      return originalElement;
    },
    //屏幕大小调整
    screenwidth() {
      this.layoutwidth = document.body.clientWidth * 0.9;
      window.onresize = () => {
        return (() => {
          this.layoutwidth = document.body.clientWidth * 0.9;
        })();
      };
    },
  },
};
</script>
<style  lang="less">
@fontsize: 1rem;
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
}
.head {
  height: @navheight;
  width: 100%;
  background: #99CCCC;
 border-radius:0px 0px 10px 10px;
 box-shadow:0 0  15px #78cdd1;
 
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: 0 auto;
  .menu {
    width: 32px;
    margin: 0 auto;
    height: 32px;
    background-image: url("../assets/Image/菜单 (1).png");
    background-repeat: no-repeat;
    background-size: cover;
    outline: none !important;
  }
  .headcontent {
    text-align: @center;
    line-height: @navheight;
    .el-input {
      width: 95%;
      height: 32px;
      margin-right: 10px;   
      .selectvalue {
        width: 5rem;           
      }
      .el-button {
        width: @navheight;
      }
      .el-input__inner {
        padding: 0px 15px;     
      }         
    }
  }
}
.content {
  width: 100%;
  z-index: -1;
  margin-top: 4.5rem;
  padding-bottom: 4rem;
  dl:not(:nth-child(1)) {
    margin-top: 1rem;
  }
  dl {
    dt {
      float: left;
      clear: both;

      .el-image {
        cursor: pointer;
        width: @imgwidth;
      }
    }
    dd {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      font-size: 12px;
      margin-left: 9rem;
    }
    span {
      color: #181d4b;
    }
  }
}
.footer {
  width: 100%;
  height: @navheight;
 background: #99CCCC;
 border-radius:10px 10px 0px 0px;
 box-shadow:0 0  15px #78cdd1;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  .divipage {
    text-align: center;
    line-height: @navheight;
    width: 100%;
    height: @navheight !important;
    // transform: scale(0.95);
    .prev {
      color: #f6f5ec;
    }
    .next {
      color: #f6f5ec;
    }
    li {
      color: #009ad6;
    }
  }
}
.liststyle{
  // margin-top: 20px;
  overflow: auto;
  h3{
    color: #003366;
    margin-left: 10px;
  }
 .el-col{
div{
    margin-left: 5px;
    margin-top: 10px;
    .tag{
   
      float: left;
		margin-left: 10px;
		padding: 10px;
		background: #f7f7f7;
		margin-bottom: 10px;
		border-radius: 4px;
		font-size: 14px;
    }
    .activetag{
     float: left;
		margin-left: 10px;
		padding: 10px;
		background: #efc531;
		margin-bottom: 10px;
		border-radius: 4px;
		font-size: 14px;
    }
  }
 } 
}
</style>