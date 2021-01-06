import React from 'react';
import {Layout, Table, Button } from 'antd';
import InfoDialog from './InfoDialog'

const { Header, Content, Icon } = Layout;

var columns = [
    {
      title: '业务',  //新开，续卡
      dataIndex: 'service',
      width:"80px",
    },
    {
      title: '金额',
      dataIndex: 'money',
      width:"80px",
    },
    {
      title: '卡号',
      dataIndex: 'card_number',
      width:"100px",
    },
    {
        title: '姓名',
        dataIndex: 'name',
        width:"80px",
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        width:"120px",
    },
    {
        title: '项目',
        dataIndex: 'project',
        width:"80px",
    },
    {
        title: '导购员',
        dataIndex: 'shop_guide',
        width:"80px",
    },
    {
        title: '老师',
        dataIndex: 'teacher',
        width:"80px",
    },
    {
        title: '财务情况',
        dataIndex: 'financial',
    },
    {
        title: '备注1',
        dataIndex: 'remarks1',
    },
    {
        title: '收钱吧详情',
        dataIndex: 'collect_money',
    },
    {
        title: '备注2',
        dataIndex: 'remarks2',
    },
];
const columns1 = columns.slice(0);

class HomePage extends React.Component{
    columns2 = []; //定义
    state = {
        showInfoDialog: false, //显示添加对话框
        editingItem: null, //对话框编辑的内容
        my_columns:[], //列名
        showAdmin: false, //是否为管理员，即是否增加一列
        show_back: "none", //是否显示“back”
    }
    admin_item = {
        title: '操作',
        render: (staff)=>(
            <span>
                <Icon type="edit" onClick={()=>this.showUpdateDialog(staff)}/>
                <Icon type="close" title="删除" style={{ color: '#ee6633', marginLeft:12}} onClick={() => this.deleteConfirm(staff)} />
            </span>
        ),
    };

    componentDidMount() {
        columns.push(this.admin_item); //加了一列的
        this.columns2 = columns;

        this.getMyColumns(); //获取列名
    }

    showUpdateDialog(item){
        console.log("hi,showUpdateDialog");

        this.setState({
            //如果有数据，则把该条数据复制，显示在对话框中，可供修改
            showInfoDialog: true,
        });
    }
    deleteConfirm = (staff)=>{
        console.log("hi,deleteConfirm");
    }

    getMyColumns(){
        if(this.state.showAdmin===true){
            this.setState({
                my_columns: this.columns2,
            });
        }else{
            this.setState({
                my_columns: columns1,
            });
        }
    }

    gotoAdmin = ()=>{
        //点击后，应该进入管理员模式
        console.log("进入管理员模式");
        this.setState({
            showAdmin: true,
            show_back: "block",
        },function(){ //立马可以获取新的state值
            this.getMyColumns(); //重新获取列名
        });
    }
    onBack = ()=>{
        this.setState({
            showAdmin: false, //隐藏只有管理员可见的列
            show_back: "none", //隐藏"返回"
        },function(){
            this.getMyColumns();
        });
    }
    render(){
        return (
            <Layout>
                <Header>
                    <div style={{lineHeight:'64px', fontSize:"20px", color:"white",textAlign:"center"}}> 
                        拉布拉卡 - 卡片管理系统
                    </div>
                </Header>

                <Content >
                    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                    <Button style={{position:"absolute", right:"70px", top:"20px"}} onClick={()=>this.showUpdateDialog()}>添加</Button>
                        <Table 
                            columns={this.state.my_columns}
                            // dataSource={data} 
                            rowKey={item=>item.id}  
                            pagination={{ pageSize: 20 }} 
                            scroll={{ y: 340 }} />

                        <InfoDialog
                            visible={this.state.showInfoDialog}
                            staff={this.state.editingItem}
                            afterClose={()=>{
                                this.setState({showInfoDialog:false});
                            }}
                            onDialogConfirm={this.handleInfoDialogClose} />

                        <div style={{position:"absolute", left:"10px", bottom:"10px"}}>
                            <a onClick={this.gotoAdmin}>管理员</a>
                        </div>
                        <div style={{position:"absolute", left:"70px", bottom:"10px", display:this.state.show_back}}>
                            <a onClick={this.onBack}>返回</a>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default HomePage;
