<template>
    <CardToolbox>
        <sdPageHeader
            title="Users"
            :routes="[]"
            class="ninjadash-page-header-main"
        >
            <template #subTitle>
                <span class="title-counter">274 Users</span>
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
                    + Add New User
                </a-button>
                <a-drawer
                    title="Add New User"
                    :width="720"
                    v-model:visible="open"
                    :body-style="{ paddingBottom: '80px' }"
                    :footer-style="{ textAlign: 'right' }"
                    @close="onClose"
                >
                    <a-form :model="form" :rules="rules" layout="vertical">
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item
                                    label="First Name"
                                    name="first_name"
                                >
                                    <a-input
                                        v-model:value="form.first_name"
                                        placeholder="Please enter first name"
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Last Name" name="last_name">
                                    <a-input
                                        v-model:value="form.last_name"
                                        placeholder="Please enter last name"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="Email" name="email">
                                    <a-input
                                        type="email"
                                        v-model:value="form.email"
                                        placeholder="Please enter email"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item label="Password" name="password">
                                    <a-input
                                        type="password"
                                        v-model:value="form.password"
                                        placeholder=".........."
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item label="Assign Role" name="role">
                                    <select
                                        v-model="form.role"
                                        class="custom-select"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="role1">
                                            First Role
                                        </option>
                                        <option value="role2">
                                            Second Role
                                        </option>
                                    </select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="Phone" name="phone">
                                    <a-input
                                        type="password"
                                        v-model:value="form.phone"
                                        placeholder="Please enter phone number"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :span="24">
                                <a-space align="end">
                                    <a-button @click="onClose">Cancel</a-button>
                                    <a-button type="primary" @click="onClose"
                                        >Submit</a-button
                                    >
                                </a-space>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-drawer>
            </template>
        </sdPageHeader>
    </CardToolbox>

    <Main>
        <a-row :gutter="25">
            <a-col
                v-for="user in team"
                :key="user.id"
                :xxl="6"
                :lg="8"
                :sm="12"
                :xs="24"
            >
                <Suspense>
                    <template #fallback>
                        <sdCards headless>
                            <a-skeleton avatar active />
                        </sdCards>
                    </template>
                    <template #default>
                        <TeamCard :user="user">
                            <template #item>
                                <a to="#">
                                    <unicon name="eye" width="14"></unicon>
                                    <span>View</span>
                                </a>
                                <a to="#">
                                    <unicon name="edit" width="14"></unicon>
                                    <span>Edit</span>
                                </a>
                                <a to="#">
                                    <unicon
                                        name="trash-alt"
                                        width="14"
                                    ></unicon>
                                    <span>Delete</span>
                                </a>
                            </template>
                        </TeamCard>
                    </template>
                </Suspense>
            </a-col></a-row
        >
    </Main>
</template>
<script>
import { computed, defineAsyncComponent, defineComponent } from "vue";
import { useStore } from "vuex";
import { Main, CardToolbox } from "../../styled";
import { reactive, ref } from "vue";
const TeamCard = defineAsyncComponent(() => import("./overview/TeamCard"));

const Team = defineComponent({
    name: "Team",
    components: { Main, CardToolbox, TeamCard },
    setup() {
        const { state } = useStore();
        const searchData = computed(() => state.headerSearchData.data);
        const team = computed(() => state.team.data);

        const form = reactive({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: "",
            phone: "",
        });

        const rules = {
            first_name: [
                {
                    required: true,
                    message: "Please enter first name",
                },
            ],
            last_name: [
                {
                    required: true,
                    message: "Please enter last name",
                },
            ],
            email: [
                {
                    required: true,
                    message: "please enter valid email",
                },
            ],
            password: [
                {
                    required: true,
                    message: "Please enter password",
                },
            ],
            role: [
                {
                    required: true,
                    message: "Please assign a role",
                },
            ],
            phone: [
                {
                    required: false,
                    message: "Please choose the approver",
                },
            ],
        };
        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        return {
            searchData,
            team,
            form,
            rules,
            open,
            showDrawer,
            onClose,
        };
    },
});

export default Team;
</script>

<style scoped>
.custom-select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f8f8;
    font-size: 16px;
    width: 100%;
    max-width: 300px; /* Adjust the width as needed */
}

.custom-select:focus {
    outline: none;
    border-color: #007bff; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Add a subtle shadow on focus */
}
</style>
