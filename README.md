# author: wmydmu@163.com
# 使用方法
- git clone https://github.com/tuam-sys/FoodDeliveryApp
- cd sell
- npm install
- npm run dev
## 注意：
- 由于本项目的数据都是mock出来的(数据文件位于static/mock/data.json)，并且请求数据的baseURL设置的是"http://localhost:8080/"，如果使用npm run dev启动项目后无法请求到数据，可以采用以下两种方法：
	- 关闭当前已经启动的项目（包括本项目），然后运行npm run dev重启本项目，让本项目在"http://localhost:8080/"启动
	- 将main.js中的axios.defaults.baseURL设置为当前项目启动的URL
### 总结：
- 以上两种方法的思想都是让项目启动地址与axios.defaults.baseURL保持一致，只有这样才能成功请求到数据。