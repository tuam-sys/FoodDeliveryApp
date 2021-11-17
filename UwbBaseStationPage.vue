<!--  -->
<template>
    <div class="all">
        <div class="container">
            <div class="handle-box">
                <!-- <el-input v-model="searchInput" placeholder="" class="input-inline"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addOne">添加</el-button>
            </div>

            <el-dialog :title="addDialogTitle" :visible.sync="addDialogVisible" :destroy-on-close="true" width="50%">
                <el-form :model="addForm" :rules="rules" ref="editForm" label-position="top">
                    <el-form-item label="设备ID" prop="deviceID">
                        <el-input v-model="addForm.deviceID"></el-input>
                    </el-form-item>
                    <el-form-item label="联网单位" prop="company">
                        <el-cascader
                                placeholder="请选择联网单位"
                                style="width: 100%"
                                v-model="addForm.companyLocation"
                                :options="options"
                                :props="{ value: 'label' }"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="所在位置" prop="location">
                        <el-cascader
                                placeholder="楼房名称"
                                style="width: 45%; margin-right: 10%"
                                v-model="addForm.nameOfBuilding"
                                :options="options"
                                :props="{ value: 'label' }"
                        ></el-cascader>
                        <el-cascader
                                placeholder="层名称"
                                style="width: 45%"
                                v-model="addForm.nameOfFloor"
                                :options="options"
                                :props="{ value: 'label' }"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="X坐标" prop="XLable">
                        <el-input v-model="addForm.XLable" placeholder="请输入X坐标"></el-input>
                    </el-form-item>
                    <el-form-item label="Y坐标" prop="YLable">
                        <el-input v-model="addForm.YLable" placeholder="请输入Y坐标"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelMotified">取 消</el-button>
                    <el-button type="primary" @click="motified('editForm')">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog :title="editDialogTitle" :visible.sync="editDialogVisible" :destroy-on-close="true" width="50%">
                <el-form :model="addForm" :rules="rules" ref="editForm" label-position="top">
                    <el-form-item label="设备ID" prop="deviceID">
                        <el-input v-model="editForm.deviceID"></el-input>
                    </el-form-item>
                    <el-form-item label="联网单位" prop="company">
                        <el-cascader
                                placeholder="请选择联网单位"
                                style="width: 100%"
                                v-model="editForm.companyLocation"
                                :options="options"
                                :props="{ value: 'label' }"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="所在位置" prop="location">
                        <el-cascader
                                placeholder="楼房名称"
                                style="width: 45%; margin-right: 10%"
                                v-model="editForm.nameOfBuilding"
                                :options="options"
                                :props="{ value: 'label' }"
                        ></el-cascader>
                        <el-cascader
                                placeholder="层名称"
                                style="width: 45%"
                                v-model="editForm.nameOfFloor"
                                :options="options"
                                :props="{ value: 'label' }"
                        ></el-cascader>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelMotified">取 消</el-button>
                    <el-button type="primary" @click="motified('editForm')">确 定</el-button>
                </div>
            </el-dialog>

            <div class="show-table">
                <el-table
                        :data="tableData"
                        border
                        class="table"
                        ref="multipleTable"
                        header-cell-class-name="table-header"
                        @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="60" align="center"></el-table-column>
                    <el-table-column prop="index" label="序号" width="60" align="center"></el-table-column>
                    <el-table-column prop="nameOfBuilding" label="楼房名称" width="120" align="center"></el-table-column>
                    <el-table-column prop="nameOfFloor" label="层名称"></el-table-column>
                    <el-table-column prop="stateOfBluetooth" label="蓝牙状态" align="center">
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.qStatus"
                                    active-color="#20a0ff"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="deviceID" label="设备ID"></el-table-column>
                    <el-table-column prop="company" label="所属单位"></el-table-column>
                    <el-table-column prop="typeOfDevice" label="设备类型"></el-table-column>
                    <el-table-column prop="strengthOfSignal" label="信号强度"></el-table-column>
                    <el-table-column prop="state" label="状态"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-search" @click="handleJump(scope.$index, scope.row)">
                                查看
                            </el-button>
                            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">
                                修改
                            </el-button>
                            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- <el-button type="primary" icon="el-icon-check" class="handle-del mr10" @click="selectAll">选择全部</el-button> -->

            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" id="handle-del-list" @click="delAllSelection"
            >批量删除</el-button
            >

            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';
    import { post } from '../../api/index';
    export default {
        name: 'uwbBaseStationPage',
        //import引入的组件需要注入到对象中才能使用
        components: {},
        data() {
            //这里存放数据
            return {
                breadlist: [
                    {
                        name: '首页',
                        path: { path: '/dashboard' }
                    },
                    {
                        name: '设备管理',
                        path: { path: '/companyManagement' }
                    },

                ],

                rules: {
                    deviceID: [{ required: true, message: '设备名称不可为空', trigger: 'change' }],
                    company: [{ required: true, message: '单位名称不可为空', trigger: 'change' }],
                    nameOfBuilding: [{ required: true, message: '楼房名称不可为空', trigger: 'change' }],
                    nameOfFloor: [{ required: true, message: '层数不可为空', trigger: 'change' }],
                    XLable: [{ required: true, message: 'X坐标不可为空', trigger: 'change' }],
                    YLable: [{ required: true, message: 'Y坐标不可为空', trigger: 'change' }],
                    value: [{trigger: 'change'}]
                },
                value: false,
                //查询参数
                query: {
                    address: 'company/building/',
                    data: '',
                    json: {
                        action: 'list_building',
                        data: {
                            pageIndex: 1,
                            pageNum: 10,
                            companyID: -1
                        },
                        token: ''
                    }
                },
                addOneQuery: {
                    address: 'company/building/',
                    data: '',
                    json: {
                        action: 'add_building',
                        data: {
                            companyID:'',
                            nameOfBuilding: '',
                            indexOfFloor: '',
                            address: '',
                            date: ''
                        },
                        token: ''
                    }
                },
                deleteQuery: {
                    address: 'company/building/',
                    data: '',
                    json: {
                        action: 'delete_building',
                        companyID:'',
                        idlist: [],
                        token: ''
                    }
                },
                searchInput: '',
                tableData: [
                    {
                        index: '1',
                        nameOfBuilding: '1号楼',
                        nameOfFloor: '1层',
                        stateOfBluetooth: '1',
                        deviceID: 'FFF158',
                        company: 'xxx单位',
                        typeOfDevice: '基站',
                        strengthOfSignal: '45db',
                        state: '在线'
                    },
                    {index: '2', nameOfBuilding: '1号楼', nameOfFloor: '1层', 1: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '3', nameOfBuilding: '1号楼', nameOfFloor: '1层', 1: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '4', nameOfBuilding: '1号楼', nameOfFloor: '1层', 0: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '5', nameOfBuilding: '1号楼', nameOfFloor: '1层', 0: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '6', nameOfBuilding: '1号楼', nameOfFloor: '1层', 1: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '7', nameOfBuilding: '1号楼', nameOfFloor: '1层', 0: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '8', nameOfBuilding: '1号楼', nameOfFloor: '1层', 1: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '9', nameOfBuilding: '1号楼', nameOfFloor: '1层', 0: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                    {index: '10', nameOfBuilding: '1号楼', nameOfFloor: '1层', 1: '北京市海淀区西二旗', deviceID: 'FFF158', company: 'xxx单位', typeOfDevice: '基站', strengthOfSignal: '45db', state: '在线'},
                ],
                addForm: {
                    deviceID: '',
                    company: [],
                    nameOfBuilding: [],
                    nameOfFloor: [],
                    XLable: '',
                    YLable: ''
                },
                editForm: {
                    deviceID: '',
                    company: [],
                    nameOfBuilding: [],
                    nameOfFloor: []
                },
                selectRolePermission: ['1', '2'],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    id: 'path',
                    isLeaf: 'leaf'
                },
                multipleSelection: [],
                delList: [],
                checkList: [],
                dialogFormVisible: false,
                addDialogTitle: '添加设备到联网单位',
                editDialogTitle: '修改设备信息',
                addDialogVisible: false,
                editDialogVisible: false,
                formLabelWidth: '200',
                pageTotal: 100,
                //点击修改时获取到的现有权限
                form: {},
                idx: -1,
                id: -1
            };
        },
        //监听属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合
        methods: {
            getData() {
                this.query.data = JSON.stringify(this.query.json);
                console.log(this.query.data);
                post(this.query).then((res) => {
                    console.log(res);
                    // this.tableData = res.data;
                    this.tableData.splice(0, this.tableData.length);
                    for (let i = 0; i < res.data.length; i++) {
                        console.log(res.data[i]);
                        var tmp = {};
                        tmp.id = res.data[i].id;
                        tmp.date = res.data[i].date;
                        tmp.nameOfBuilding = res.data[i].nameOfBuilding;
                        tmp.indexOfFloor = res.data[i].indexOfFloor;
                        tmp.address = res.data[i].address;
                        this.tableData.push(tmp);
                    }
                    this.pageTotal = res.total || 0;
                });
            },
            addOne() {
                this.addDialogVisible = true;
                this.addDialogTitle = '添加设备到联网单位';
                this.addForm.deviceID = '';
                this.addForm.company = '';
                this.addForm.nameOfBuilding = '';
                this.addForm.nameOfFloor = '';
                this.addForm.XLable = '';
                this.addForm.YLable = '';
            },
            selectAll() {},
            // 触发搜索按钮
            // handleSearch() {
            //     let tmp = {};
            //     tmp.id = this.searchInput;
            //     this.query.param = tmp;
            //     this.$set(this.query);
            //     fetchData(this.query).then((res) => {
            //         console.log(res);
            //         // this.tableData = res.data;
            //         this.tableData.splice(0, this.tableData.length);
            //         var tmp = {};
            //         tmp.id = res.data.id;
            //         tmp.date = res.data.last_name;
            //         tmp.role = res.data.first_name;
            //         tmp.note = res.data.email;
            //         this.tableData.push(tmp);
            //         this.pageTotal = res.total || 1;
            //     });
            // },
            handleJump(index, row){
                this.$router.push({
                    path: '/companyManagement/FloorDetails',
                    query: {
                        companyID: this.$route.query.companyID,
                        buildingID:this.tableData[index].id,
                    }
                });
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.deleteQuery.json.idlist.push(this.tableData[index].id);
                        this.deleteQuery.data = JSON.stringify(this.deleteQuery.json);
                        console.log(this.deleteQuery.data);
                        post(this.deleteQuery).then((res) => {
                            console.log(res);
                            // alert(res);
                            if (res.ret == 0) {
                                this.$message.success(`删除了${str}`);
                                //更新数据
                            } else {
                                this.$message.error('修改失败:' + res.msg);
                            }
                            this.getData();
                        });
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].nameOfBuilding + '的第' + this.multipleSelection[i].indexOfFloor + '  ';
                    let index = getIndex(this.tableData, this.multipleSelection[i]);
                    this.deleteQuery.json.idlist.push(this.tableData[index].id);
                    // this.tableData.splice(index, 1);
                }
                this.deleteQuery.data = JSON.stringify(this.deleteQuery.json);
                console.log(this.deleteQuery.data);
                post(this.deleteQuery).then((res) => {
                    console.log(res);
                    // alert(res);
                    if (res.ret == 0) {
                        this.$message.success(`删除了${str}`);
                        //更新数据
                    } else {
                        this.$message.error('修改失败:' + res.msg);
                    }
                    this.getData();
                });
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                // alert('点击了第' + index + '个' + row);
                console.log(row);
                this.idx = index;
                this.form = row;
                this.editDialogVisible = true;
                console.log(this.editDialogVisible, this.form);
                this.editDialogTitle = '修改设备信息';

                this.editForm.deviceID= this.tableData[index].deviceID;
                this.editForm.company= this.tableData[index].company;
                this.editForm.nameOfBuilding= this.tableData[index].nameOfBuilding;
                this.editForm.nameOfFloor= this.tableData[index].nameOfFloor;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                //  this.$set(this.query.param, 'page', val);
                this.query.param.page = val;
                this.getData();
            },
            motified(formName) {
                console.log(this.$refs[formName]);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        //包含半选节点
                        let nowDate = new Date();
                        let date = {
                            year: nowDate.getFullYear(),
                            month: nowDate.getMonth() + 1,
                            date: nowDate.getDate()
                        };
                        console.log(date);
                        let systemDate =
                            date.year +
                            '-' +
                            (date.month < 10 ? '0' + date.month : date.month) +
                            '-' +
                            (date.date < 10 ? '0' + date.date : date.date);
                        //此处添加具体的内容

                        this.addOneQuery.json.data.date = systemDate;
                        this.addOneQuery.json.data.deviceID = this.addForm.deviceID;
                        this.addOneQuery.json.data.company = this.addForm.company;
                        this.addOneQuery.json.data.nameOfBuilding = this.addForm.nameOfBuilding;
                        this.addOneQuery.json.data.nameofFloor = this.addForm.nameOfFloor;
                        this.addOneQuery.json.data.XLable = this.addForm.XLable;
                        this.addOneQuery.json.data.YLable = this.addForm.YLable;
                        //调用网络请求。

                        this.addOneQuery.data = JSON.stringify(this.addOneQuery.json);
                        console.log(this.addOneQuery.data);
                        post(this.addOneQuery).then((res) => {
                            console.log(res);
                            if (res.ret == 0) {
                                this.$message.success('添加成功');
                                //更新数据
                                this.getData();
                            } else {
                                this.$message.error('添加失败');
                            }
                        });
                        // this.tableData.push(tmp);

                        ////TODO 根据form、editForm的参数，axois调用接口修改对应角色所具有的权限。并根据结果显示正确或错误的提示。

                        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancelMotified() {
                this.addDialogVisible = false;
                this.editDialogVisible = false;

            }
        },
        //生命周期 - 创建完成（可以访问当前this实例）
        created() {
            this.query.json.token = localStorage.getItem('token');
            this.addOneQuery.json.token = localStorage.getItem('token');
            this.deleteQuery.json.token = localStorage.getItem('token');
            // console.log('building create');
            // console.log(this.$route.query.companyID);
            this.query.json.data.companyID = this.$route.query.companyID;
            this.addOneQuery.json.data.companyID = this.$route.query.companyID;
            this.deleteQuery.json.companyID = this.$route.query.companyID;
            this.getData();
            //noderoutes = this.trees = this.generateRouter(permissionRoutes);
        },
        //生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {},
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
    };

    function getIndex(_arr, _obj) {
        var len = _arr.length;
        for (var i = 0; i < len; i++) {
            if (_arr[i] == _obj) {
                return parseInt(i);
            }
        }
        return -1;
    }
</script>

<style scoped>
    .input-inline {
        width: 200px;
        margin-right: 10px;
    }
    #handle-del-list {
        float: left;
    }
    .show-table {
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .pagination {
        padding: 0px;
        margin: 0px;
    }
</style>
