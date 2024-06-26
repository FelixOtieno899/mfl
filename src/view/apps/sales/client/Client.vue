<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Clients">
                        <a-row>
                            <a-col
                                style="display: flex; justify-content: flex-end"
                                :span="24"
                            >
                                <a-button
                                    style="margin-top: -30px"
                                    type="primary"
                                    @click="showDrawer"
                                >
                                    <template #icon><PlusOutlined /></template>
                                    + Add New
                                </a-button>
                                <a-drawer
                                    title="Create New Client"
                                    :width="720"
                                    v-model:visible="open"
                                    :body-style="{ paddingBottom: '80px' }"
                                    :footer-style="{ textAlign: 'right' }"
                                    @close="onClose"
                                >
                                    <template v-if="isLoading">
                                        <a-space>
                                            <a-spin size="large" />
                                        </a-space>
                                    </template>

                                    <template v-else>
                                        <a-form
                                            :model="form"
                                            @finish="handleSubmit"
                                            :rules="rules"
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Company Name"
                                                        name="company_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter company name!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.company_name
                                                            "
                                                            placeholder=" Enter company name"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Client First Name"
                                                        name="first_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter first name!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.first_name
                                                            "
                                                            placeholder=" Enter first name"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Client Last Name"
                                                        name="last_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter last name!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.last_name
                                                            "
                                                            placeholder="Enter last name"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Client Email"
                                                        name="email"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter email!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="email"
                                                            v-model:value="
                                                                form.email
                                                            "
                                                            placeholder="Enter email"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Client Pin No"
                                                        name="company_pin"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter client pin number!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.company_pin
                                                            "
                                                            placeholder="Enter client pin number"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Phone"
                                                        name="phone"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter phone!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.phone
                                                            "
                                                            placeholder="eg +254717960820"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Address"
                                                        name="address"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                                message:
                                                                    'Please enter address!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.address
                                                            "
                                                            placeholder="Enter address"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Pass set"
                                                        name="is_password_set"
                                                        hidden
                                                    >
                                                        <a-input
                                                            v-model:value="
                                                                form.is_password_set
                                                            "
                                                            hid
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Email Verify"
                                                        name="email_verified_at"
                                                        hidden
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.email_verified_at
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Website"
                                                        name="website"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                                message:
                                                                    'Please enter website!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.website
                                                            "
                                                            placeholder="http://www.example.com"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Postal Code"
                                                        name="postal_code"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please enter postal_code!',
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.postal_code
                                                            "
                                                            placeholder="Enter postal code"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Country"
                                                        name="country_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select country!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.country_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select Country
                                                            </option>
                                                            <option
                                                                v-for="country in countries"
                                                                :key="
                                                                    country.id
                                                                "
                                                                :value="
                                                                    country.id
                                                                "
                                                            >
                                                                {{
                                                                    country.name
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="State"
                                                        name="state_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please select state!',
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.state_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select State
                                                            </option>
                                                            <option
                                                                v-for="state in states"
                                                                :key="state.id"
                                                                :value="
                                                                    state.id
                                                                "
                                                            >
                                                                {{
                                                                    state.state
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="City"
                                                        name="city_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.city_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Select City
                                                            </option>
                                                            <option
                                                                v-for="city in cities"
                                                                :key="city.id"
                                                                :value="city.id"
                                                            >
                                                                {{ city.city }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row>
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Note"
                                                        name="note"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
                                                            type="text"
                                                            v-model:value="
                                                                form.note
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="24">
                                                    <a-space align="end">
                                                        <a-button
                                                            @click="onClose"
                                                            >Cancel</a-button
                                                        >
                                                        <a-button
                                                            type="primary"
                                                            html-type="submit"
                                                            >Submit</a-button
                                                        >
                                                    </a-space>
                                                </a-col>
                                            </a-row>
                                        </a-form>
                                    </template>
                                </a-drawer>
                            </a-col>
                        </a-row>
                        <DataTables
                            :filterOption="true"
                            :filterOnchange="true"
                            :tableData="tableDataScource"
                            :columns="dataTableColumn"
                            :rowSelection="false"
                            @search="fetchClients"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, reactive, ref, onMounted } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
//import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Client",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        //const { state } = useStore();
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);

        const countries = ref([]);

        const states = ref([]);

        const cities = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchClients(),
                fetchCountries(),
                fetchStates(),
                fetchCities(),
            ]);
        };

        const fetchClients = async (address = null) => {
            try {
                let response;
                if (address) {
                    // Call the searchDrivers method if a nationalId is provided
                    response = await searchClients(address);
                } else {
                    // Existing logic to fetch all drivers
                    response = await DataService.get("/clients");
                    console.log("Clients fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Clients)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Clients.map(
                                (client) => ({
                                    // id: `#${supplier.id}`,
                                    key: client.id,
                                    first_name: (
                                        <span class="ninjadash-username">
                                            {client.user.first_name}
                                        </span>
                                    ),
                                    last_name: (
                                        <span class="ninjadash-username">
                                            {client.user.last_name}
                                        </span>
                                    ),
                                    email: <span>{client.user.email}</span>,
                                    phone: <span>{client.user.phone}</span>,
                                    address: <span>{client.address}</span>,

                                    // stock_quantity: product.stock_quantity,
                                    // sku: product.sku,
                                    // // status: (
                                    // //     <span
                                    // //         class={`ninjadash-status ninjadash-status-${insurer.status}`}
                                    // //     >
                                    // //         {insurer.status}
                                    // //     </span>
                                    // // ),
                                }),
                            );
                        } else {
                            // No drivers found, handle accordingly
                            tableDataScource.value = [];
                        }
                    } else {
                        return;
                        //toast.error("Failed to fetch drivers. Please try again.");
                    }
                }
            } catch (error) {
                console.error("Error fetching clients:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchClients = async (address) => {
            try {
                const response = await DataService.get(
                    `/clients/search/${address}`,
                );
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Clients)
                ) {
                    tableDataScource.value = response.data.Clients.map(
                        (client) => ({
                            // id: `#${supplier.id}`,
                            key: client.id,
                            first_name: (
                                <span class="ninjadash-username">
                                    {client.user.first_name}
                                </span>
                            ),
                            last_name: (
                                <span class="ninjadash-username">
                                    {client.user.last_name}
                                </span>
                            ),
                            email: <span>{client.user.email}</span>,
                            phone: <span>{client.user.phone}</span>,
                            address: <span>{client.address}</span>,

                            // stock_quantity: product.stock_quantity,
                            // sku: product.sku,
                            // // status: (
                            // //     <span
                            // //         class={`ninjadash-status ninjadash-status-${insurer.status}`}
                            // //     >
                            // //         {insurer.status}
                            // //     </span>
                            // // ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching suppliers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchCountries = async () => {
            try {
                const response2 = await DataService.get(`/countries`);
                console.log("Countries fetched", response2.data.Countries);
                countries.value = response2.data.Countries;
            } catch (error) {
                console.error("Error fetching countries:", error);
                if (error.response2) {
                    console.error("Error response:", error.response2);
                }
            }
        };

        const fetchStates = async () => {
            try {
                const response3 = await DataService.get(`/states`);
                console.log("States fetched", response3.data);
                states.value = response3.data.States;
            } catch (error) {
                console.error("Error fetching states:", error);
                if (error.response3) {
                    console.error("Error response:", error.response3);
                }
            }
        };

        const fetchCities = async () => {
            try {
                const response4 = await DataService.get(`/cities`);
                console.log("Cities fetched", response4.data);
                cities.value = response4.data.Cities;
            } catch (error) {
                console.error("Error fetching cities:", error);
                if (error.response4) {
                    console.error("Error response:", error.response4);
                }
            }
        };

        const viewClient = (clientId) => {
            router.push(`/app/clients/${clientId}`);
        };

        const editClient = (clientId) => {
            router.push(`/app/clients/edit/${clientId}`);
        };
        const deleteClient = async (clientId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this measurement? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/clients/${clientId}`);
                    toast.success("Client  deleted successfully.");
                    await fetchClients(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete client. Please try again.");
                }
            }
        };

        const dataTableColumn = [
            // {
            //     title: "Id",
            //     dataIndex: "id",
            //     key: "id",
            // },
            {
                title: "First Name",
                dataIndex: "first_name",
                key: "user",
            },
            {
                title: "Last Name",
                dataIndex: "last_name",
                key: "user",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "coutry",
            },
            {
                title: "Phone",
                dataIndex: "phone",
                key: "coutry",
            },
            {
                title: "Address",
                dataIndex: "address",
                key: "address",
            },

            {
                title: "Actions",
                dataIndex: "action",
                key: "action",
                width: "90px",
                customRender: ({ record }) => {
                    return (
                        <div class="table-actions">
                            <button
                                class="view"
                                onClick={() => viewClient(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editClient(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteClient(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchAllData();
        });

        const form = reactive({
            first_name: "",
            last_name: "",
            email: "",
            company_pin: "",
            phone: "",
            website: "",
            is_password_set: "",
            email_verified_at: "",
            postal_code: "",
            address: "",
            country_id: "",
            state_id: "",
            city_id: "",
            company_name: "",
            note: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            // Check if all required fields are filled
            if (
                !form.first_name ||
                !form.last_name ||
                !form.email ||
                !form.company_pin ||
                !form.phone ||
                !form.address ||
                !form.country_id ||
                !form.state_id ||
                !form.city_id
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected country is valid
            const selectedCountry = countries.value.find(
                (country) => country.id === form.country_id,
            );
            if (!selectedCountry) {
                toast.error("Please select country.");
                return; // Prevent form submission
            }

            // Check if the selected state is valid
            const selectedState = states.value.find(
                (state) => state.id === form.state_id,
            );
            if (!selectedState) {
                toast.error("Please select state.");
                return; // Prevent form submission
            }

            // Check if the selected city is valid
            const selectedCity = cities.value.find(
                (city) => city.id === form.city_id,
            );
            if (!selectedCity) {
                toast.error("Please select city.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("first_name", form.first_name);
            formData.append("last_name", form.last_name);
            formData.append("email", form.email);
            formData.append("phone", form.phone);
            formData.append("company_pin", form.company_pin);
            formData.append("website", form.website);
            formData.append("is_password_set", form.is_password_set);
            formData.append("email_verified_at", form.email_verified_at);
            formData.append("postal_code", form.postal_code);
            formData.append("address", form.address);
            formData.append("country_id", form.country_id);
            formData.append("state_id", form.state_id);
            formData.append("city_id", form.city_id);
            formData.append("company_name", form.company_name);
            formData.append("note", form.note);

            try {
                isLoading.value = true;
                const response = await DataService.post("/clients", formData);

                console.log(
                    "Client response after post:",
                    response.data.client,
                );

                if (response.status === 201) {
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.first_name = "";
                    form.last_name = "";
                    form.email = "";
                    form.phone = "";
                    form.website = "";
                    form.postal_code = "";
                    form.is_password_set = "";
                    form.email_verified_at = "";
                    form.address = "";
                    form.country_id = "";
                    form.state_id = "";
                    form.city_id = "";
                    form.client_pin_no = "";
                    form;

                    // Close the drawer
                    open.value = false;

                    //Fetch Clients again to update the table data

                    await fetchClients();

                    router.push({ path: "/app/clients" });
                } else {
                    //console.error("Record Add Failed");
                    toast.error("Failed to add record. Please try again.");
                }
            } catch (error) {
                console.error("Record Add error", error);
                toast.error("An error occurred. Please try again.");
            } finally {
                isLoading.value = false;
            }
        };

        const open = ref(false);
        const showDrawer = () => {
            open.value = true;
        };
        const onClose = () => {
            open.value = false;
        };

        return {
            // data,
            // columns,
            // columnsPagination,
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            countries,
            states,
            cities,
            fetchClients,

            // handleCancel,
            // handlePreview,
            // fileList,
        };
    },
});
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
