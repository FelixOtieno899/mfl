<template>
  <CardToolbox>
    <sdPageHeader
      title="Roles & Permissions"
      :routes="[]"
      class="ninjadash-page-header-main"
    >
      <template #subTitle>
        <span class="title-counter">30 Permissions</span>
        <sdAutoComplete
          :dataSource="searchData"
          width="100%"
          placeholder="Search by Name"
          patterns
        />
      </template>

      <template #buttons>
        <a-button type="primary" @click="showDrawer">
          <template #icon><PlusOutlined /></template>
          + Add New Role
        </a-button>
        <a-drawer
          title="Create New Role"
          :width="720"
          v-model:visible="open"
          :body-style="{ paddingBottom: '80px' }"
          :footer-style="{ textAlign: 'right' }"
          @close="onClose"
        >
          <a-form :model="form" :rules="rules" layout="vertical">
            <a-checkbox-group v-model:value="value" style="width: 100%">
              <a-row style="margin-bottom: 20px">
                <a-col>
                  <h4>Role Name</h4>
                  <a-input
                    type="text"
                    v-model:value="form.role"
                    placeholder="Please enter role name"
                    style="width: 400px"
                  />
                </a-col>
              </a-row>
              <a-row>
                <a-col> <h3>Assign Permission to Roles</h3> </a-col>
                <a-col> </a-col>
              </a-row>
              <a-row>
                <a-col
                  ><a-checkbox
                    style="font-weight: bold"
                    v-model:checked="checked"
                    >Module</a-checkbox
                  ></a-col
                >
                <a-col style="margin-left: 70px; font-weight: bold"
                  >Permissions</a-col
                >
              </a-row>
              <a-divider style="height: 2px; background-color: #89cff0" />
              <a-row style="margin-top: -10px">
                <a-col :span="4">
                  <a-checkbox value="user">User</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="view">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="create">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="edit">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="delete">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="role">Role</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="role1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="role2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="role3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="role4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="report">Report</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="report1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="report2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="report3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="report4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="driver">Driver</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="driver1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="driver2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="driver3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="driver4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="client">Client</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="client1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="client2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="client3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="client4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="invoice">Invoice</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="invoice1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="invoice2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="invoice3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="invoice4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="delivery">Delivery Note</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="delivery1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="delivery2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="delivery3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="delivery4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="credit">Credit Note</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="credit1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="credit2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="credit3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="credit4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="purchase">Purchase Order</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="purchase1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="purchase2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="purchase3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="purchase4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="product">Product</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="product1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="product2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="product3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="product4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="job">Job Card</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="job1">View</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="job2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="job3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="job4">Delete</a-checkbox>
                </a-col>
              </a-row>

              <a-row style="margin-top: 10px">
                <a-col :span="4">
                  <a-checkbox value="accounts">Accounts/Ledgers</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="accounts1">Manage</a-checkbox>
                </a-col>
                <a-col :span="4" style="margin-left: 40px">
                  <a-checkbox value="accounts2">Create</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="accounts3">Edit</a-checkbox>
                </a-col>
                <a-col :span="4">
                  <a-checkbox value="accounts4">Delete</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
            <a-row style="margin-top: 50px">
              <a-col :span="24">
                <a-space align="end">
                  <a-button @click="onClose">Cancel</a-button>
                  <a-button type="primary" @click="onClose">Submit</a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-form>
        </a-drawer>
      </template>
    </sdPageHeader>
  </CardToolbox>

  <Main>
    <a-row :gutter="15">
      <a-col :md="24">
        <usersListTable>
          <UserListTable />
        </usersListTable>
      </a-col>
    </a-row>
  </Main>
</template>
<script>
import UserListTable from "./overview/UserTable";
import { computed, reactive, ref, defineComponent } from "vue";
import { useStore } from "vuex";
import { Main, CardToolbox } from "../../styled";
import { usersListTable } from "./style";

const UserList = defineComponent({
  name: "UserList",
  components: { Main, CardToolbox, UserListTable, usersListTable },
  setup() {
    const { state } = useStore();
    const searchData = computed(() => state.headerSearchData.data);
    const selectedRowKeys = ref(0);
    const selectedRows = ref(0);

    const open = ref(false);
    const showDrawer = () => {
      open.value = true;
    };
    const onClose = () => {
      open.value = false;
    };

    const rules = {
      role: [
        {
          required: true,
          message: "Please enter role name",
        },
      ],
    };

    const form = reactive({
      role: "",
    });

    const checked = ref(false);

    return {
      form,
      searchData,
      selectedRowKeys,
      selectedRows,
      open,
      showDrawer,
      onClose,
      rules,
      checked,
    };
  },
});

export default UserList;
</script>
