(function(global, undefined){
  function ChatList(opts){
      if(!(this instanceof ChatList)){
        return new ChatList(opts);
      }
      this.merge(this.opts, opts);
      this.init();
  }

  ChatList.prototype = {
      opts: {
          appendTo: '',
          generateListItem: null,
          index: 0,
          data: []
      },
      merge: function(defaultOpts, userOpts){
          if(userOpts){
              Object.assign(defaultOpts, userOpts);
          }
      },
      init: function() {
          let self = this;
          this.parseData();
          this.loadPage(0);
          self.loadTips();
          let index = 0;
          window.onscroll= function(){
              let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
              let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
              let clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
              if(clientHeight + scrollTop >= scrollHeight) {
                  setTimeout(() => {
                      if(index < self.arrpage.length) {
                          self.loadPage(index);
                          self.loadTips();
                          document.getElementsByClassName('loadTips')[index].style.display = "none";
                          index++;
                      }
                      else if(index == self.arrpage.length) {
                          document.getElementsByClassName('loadTips')[index].style.display = "none";
                          self.loadEnd();
                          index++;
                      }
                  }, 2000);
              }
          }
      },
      loadPage: function(item) {
          let list = this.generateList(item);
          let appendTo = this.opts.appendTo || 'body';
          document.querySelector(appendTo).appendChild(list);
      },
      parseData: function() {
          let self = this;
          let data = this.opts.data;
          data.forEach(v => {
              v.publishTimeNew = v.buildTime;
          })
          data.sort(function(a, b) {
              return b.publishTimeNew> a.publishTimeNew ? 1 : -1;
          });
          self.arrpage = this.pagination(data, 10);
      },
      generateList: function(item) {
          let self = this;
          let map = self.arrpage;
          let list = document.createElement('ul');
          for(let i in map[item]) {
              list.classList.add('list-ul');
              list.appendChild(self.generateListItem(map[item][i]));
          }
          return list;
      },
      generateListItem: function(map){
          if(this.opts.generateListItem && typeof this.opts.generateListItem == 'function'){
              return this.opts.generateListItem(map);
          }
          var tpl = `
          <li class="list-li">
              <div class="li-hd">
                  <div class="li-hd-img">
                      <img src="` + map.avater + `" alt="">
                  </div>
              </div>
              <div class="li-bd">
                  <div class="li-bd-tp">
                      <span class="tp-name"> ` + map.name +  `</span>
                      <span class="tp-time">` + map.buildTime + `</span>
                  </div>
                  <div class="li-bd-content">` + map.content + `</div>
              </div>
          </li>
          `;
          var a = document.createElement('a');
          a.innerHTML = tpl;
          a.href = map.chat;
          return a;
      },
      pagination: function(arr, size) {
          let newArr = [];
          let i = Math.ceil(length/size*1.0);
          let j = 0;
          while(j < i){
              let spare = length - j * size >= size ? size : length - j * size;
              let temp = arr.slice(j * size, j * size + spare);
              newArr.push(temp);
              j++;
          }
          return newArr;
      },
      loadTips: function() {
          let div = document.createElement('div');
          div.classList.add('loadTips');
          div.innerHTML = `
          <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
          </div>
          <span>加载中</span>
        `;
          let appendTo = this.opts.appendTo || 'body';
          document.querySelector(appendTo).appendChild(div);
      },
      loadEnd: function() {
          let div = document.createElement('div');
          div.classList.add('loadEnd');
          div.innerHTML = "no more";
          let appendTo = this.opts.appendTo || 'body';
          document.querySelector(appendTo).appendChild(div);
      },
      preHandler: function(e) {
          e.preventDefault();
      }
  }

  // 定义ChatList
  global.ChatList = ChatList;
})(window);
