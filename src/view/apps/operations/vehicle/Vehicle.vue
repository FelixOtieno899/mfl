<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Vehicles">
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
                                    title="Create New Vehicle"
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
                                                        label="Vehicle Name"
                                                        name="vehicle_name"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.vehicle_name
                                                            "
                                                            placeholder="Enter Vehicle Name"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Vehicle Brand"
                                                        name="vehicle_brand_id"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.vehicle_brand_id
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Please Select
                                                                Brand
                                                            </option>
                                                            <option
                                                                v-for="brand in vehicleBrands"
                                                                :key="brand.id"
                                                                :value="
                                                                    brand.id
                                                                "
                                                            >
                                                                {{
                                                                    brand.model
                                                                }}
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Registration Number"
                                                        name="registration_no"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.registration_no
                                                            "
                                                            placeholder="Enter registration no"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Color"
                                                        name="vehicle_color"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <select
                                                            v-model="
                                                                form.vehicle_color
                                                            "
                                                            class="custom-select"
                                                        >
                                                            <option value="">
                                                                Please select
                                                                Color
                                                            </option>
                                                            <option
                                                                value="blue"
                                                            >
                                                                Blue
                                                            </option>
                                                            <option
                                                                value="silver"
                                                            >
                                                                Silver
                                                            </option>
                                                            <option
                                                                value="black"
                                                            >
                                                                Black
                                                            </option>
                                                            <option
                                                                value="white"
                                                            >
                                                                White
                                                            </option>
                                                        </select>
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Odometer Reading"
                                                        name="odometer_reading"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.odometer_reading
                                                            "
                                                            placeholder="Please enter odometer reading"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Engine Number"
                                                        name="engine_no"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.engine_no
                                                            "
                                                            placeholder="Please enter Engine Number"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Chasis Number"
                                                        name="chassis_no"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.chassis_no
                                                            "
                                                            placeholder="Please enter chasis number"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Description"
                                                        name="description"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-textarea
                                                            type="text"
                                                            v-model:value="
                                                                form.description
                                                            "
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col>
                                                    <h4>Please Upload:</h4>

                                                    <a-form-item
                                                        label="Vehicle Image"
                                                        name="vehicle_image"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please upload this file!',
                                                            },
                                                        ]"
                                                    >
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            @change="
                                                                (event) =>
                                                                    handleFileUpload(
                                                                        event,
                                                                        'vehicle_image',
                                                                    )
                                                            "
                                                        />
                                                        <!-- Add your file upload component here -->
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row
                                                style="margin-top: 30px"
                                                :gutter="16"
                                            >
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
                            @search="fetchVehicles"
                        />
                    </sdCards>
                </BorderLessHeading>
            </a-col>
        </a-row>
    </Main>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading } from "../../../styled";
import { reactive, ref } from "vue";
//import { useStore } from "vuex";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Vehicle",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();

        const isLoading = ref(false);
        // const { state, dispatch } = useStore();

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([fetchVehicles(), fetchAllVehicleBrands()]);
        };

        const fetchVehicles = async (registrationNo = null) => {
            try {
                let response;
                if (registrationNo) {
                    // Call the searchVehicles method if a registrationNo is provided
                    response = await searchVehicles(registrationNo);
                } else {
                    // Existing logic to fetch all vehicles
                    response = await DataService.get("/vehicle");
                    console.log("Vehicles fetched", response.data);
                    if (response.status === 200) {
                        if (Array.isArray(response.data.Vehicles)) {
                            // Format the data to match the structure expected by DataTables
                            tableDataScource.value = response.data.Vehicles.map(
                                (vehicle) => ({
                                    key: vehicle.id,
                                    vehicle_name: (
                                        <span class="ninjadash-username">
                                            {vehicle.vehicle_name}
                                        </span>
                                    ),
                                    registration_no: (
                                        <span>{vehicle.registration_no}</span>
                                    ),
                                    color: vehicle.vehicle_color,
                                    odometer_reading: vehicle.odometer_reading,
                                    status: (
                                        <span
                                            class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                                        >
                                            {vehicle.status}
                                        </span>
                                    ),
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
                console.error("Error fetching vehicles:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const searchVehicles = async (registrationNo) => {
            try {
                const response = await DataService.get(
                    `/vehicle/search/${registrationNo}`,
                );

                console.log("Vehicle searched", response);
                if (
                    response.status === 200 &&
                    Array.isArray(response.data.Vehicles)
                ) {
                    tableDataScource.value = response.data.Vehicles.map(
                        (vehicle) => ({
                            key: vehicle.id,
                            vehicle_name: (
                                <span class="ninjadash-username">
                                    {vehicle.vehicle_name}
                                </span>
                            ),
                            registration_no: (
                                <span>{vehicle.registration_no}</span>
                            ),
                            color: vehicle.vehicle_color,
                            odometer_reading: vehicle.odometer_reading,
                            status: (
                                <span
                                    class={`ninjadash-status ninjadash-status-${vehicle.status}`}
                                >
                                    {vehicle.status}
                                </span>
                            ),
                        }),
                    );
                } else {
                    tableDataScource.value = [];
                }
            } catch (error) {
                console.error("Error searching drivers:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const viewVehicle = (vehicleId) => {
            router.push(`/app/vehicles/${vehicleId}`);
        };

        const editVehicle = (vehicleId) => {
            router.push(`/app/vehicles/edit/${vehicleId}`);
        };
        const deleteVehicle = async (vehicleId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this vehicle? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/vehicle/${vehicleId}`);
                    toast.success("Vehicle deleted successfully.");
                    await fetchVehicles(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete vehicle. Please try again.");
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
                title: "Name",
                dataIndex: "vehicle_name",
                key: "user",
            },
            {
                title: "Registration Number",
                dataIndex: "registration_no",
                key: "coutry",
            },

            {
                title: "Color",
                dataIndex: "color",
                key: "position",
            },
            {
                title: "Odometer Reading",
                dataIndex: "odometer_reading",
                key: "date",
            },
            {
                title: "Status",
                dataIndex: "status",
                key: "status",
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
                                onClick={() => viewVehicle(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editVehicle(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteVehicle(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const form = reactive({
            vehicle_name: "",
            vehicle_brand_id: "",
            registration_no: "",
            vehicle_color: "",
            odometer_reading: "",
            engine_no: "",
            chassis_no: "",
            description: "",
            vehicle_image: null,
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file; // Update the form's state with the selected file
            }
        };

        console.log("Items to be submmited", form.value);

        const handleSubmit = async () => {
            // // Check if any vehicle brands are available
            // if (vehicleBrands.value.length === 0) {
            //     toast.error(
            //         "No vehicle brands available. Please create a brand first.",
            //     );
            //     return; // Prevent form submission
            // }
            // Check if all required fields are filled
            if (
                !form.vehicle_name ||
                !form.vehicle_brand_id ||
                !form.registration_no ||
                !form.vehicle_color ||
                !form.odometer_reading ||
                !form.engine_no ||
                !form.chassis_no ||
                !form.description ||
                !form.vehicle_image
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            // Check if the selected vehicle brand is valid
            const selectedBrand = vehicleBrands.value.find(
                (brand) => brand.id === form.vehicle_brand_id,
            );
            if (!selectedBrand) {
                toast.error("Please select a valid vehicle brand.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("vehicle_name", form.vehicle_name);
            formData.append("vehicle_brand_id", form.vehicle_brand_id);
            formData.append("registration_no", form.registration_no);
            formData.append("vehicle_color", form.vehicle_color);
            formData.append("odometer_reading", form.odometer_reading);
            formData.append("engine_no", form.engine_no);
            formData.append("chassis_no", form.chassis_no); // Corrected typo in field name
            formData.append("description", form.description);

            // Append file upload fields
            formData.append("vehicle_image", form.vehicle_image);

            try {
                isLoading.value = true;
                const response = await DataService.post("/vehicle", formData);

                if (response.status === 201) {
                    // tableDataScource.value.push({
                    //     // id: `#${response.data.id}`,
                    //     key: response.data.Vehicle.id,
                    //     vehicle_name: (
                    //         <span class="ninjadash-username">
                    //             {response.data.Vehicle.vehicle_name}
                    //         </span>
                    //     ),
                    //     registration_no: (
                    //         <span>{response.data.Vehicle.registration_no}</span>
                    //     ),
                    //     color: response.data.Vehicle.vehicle_color,
                    //     odometer_reading:
                    //         response.data.Vehicle.odometer_reading,
                    //     status: (
                    //         <span
                    //             class={`ninjadash-status ninjadash-status-${response.data.status}`}
                    //         >
                    //             {response.data.status}
                    //         </span>
                    //     ),
                    // });
                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    // for (const key in form) {
                    //     if (Object.hasOwnProperty.call(form, key)) {
                    //         form[key] = ""; // Clear all form fields
                    //     }
                    // }
                    form.vehicle_name = "";
                    form.vehicle_brand_id = "";
                    form.registration_no = "";
                    form.vehicle_color = "";
                    form.odometer_reading = "";
                    form.engine_no = "";
                    form.chassis_no = "";
                    form.description = "";

                    form.vehicle_image = null;

                    // Close the drawer
                    open.value = false;

                    await fetchVehicles();

                    router.push({
                        path: "/app/vehicles",
                    });
                } else {
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

        const vehicleBrands = ref([]);

        const fetchAllVehicleBrands = async () => {
            try {
                const response = await DataService.get(`/vehicle/brand`);
                console.log("Vehicle  Brands fetched", response.data);
                vehicleBrands.value = response.data.Vehicle_brands;
            } catch (error) {
                console.error("Error fetching vehicle brands:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            await fetchAllData();
        });

        return {
            tableDataScource,
            dataTableColumn,
            form,
            open,
            showDrawer,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            vehicleBrands,
            fetchVehicles,
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
