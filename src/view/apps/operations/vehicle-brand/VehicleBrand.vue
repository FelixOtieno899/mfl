<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title=" Manage Vehicle Brands">
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
                                    title="Create New Vehicle Brand"
                                    :width="750"
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
                                            layout="vertical"
                                        >
                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Model"
                                                        name="model"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.model
                                                            "
                                                            placeholder="Please enter model"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Year"
                                                        name="year"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-date-picker
                                                            v-model:value="
                                                                form.year
                                                            "
                                                            style="width: 100%"
                                                            picker="year"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Gear Box"
                                                        name="gearbox"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.gearbox
                                                            "
                                                            placeholder="Please enter GearBox Type"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Axles"
                                                        name="axles"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.axles
                                                            "
                                                            placeholder="Please enter axles"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="KMs Per Liter"
                                                        name="fuel_consumption"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.fuel_consumption
                                                            "
                                                            placeholder="Manufacturer rating"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Length"
                                                        name="vehicle_length"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.vehicle_length
                                                            "
                                                            placeholder="eg. 10 meters"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Width"
                                                        name="width"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.width
                                                            "
                                                            placeholder="eg. 10 meters"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="8">
                                                    <a-form-item
                                                        label="Height"
                                                        name="height"
                                                        :rules="[
                                                            {
                                                                required: true,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.height
                                                            "
                                                            placeholder="eg. 10 meters"
                                                        />
                                                    </a-form-item>
                                                </a-col>
                                            </a-row>

                                            <a-row :gutter="16">
                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Suspension"
                                                        name="suspension"
                                                        :rules="[
                                                            {
                                                                required: false,
                                                            },
                                                        ]"
                                                    >
                                                        <a-input
                                                            type="text"
                                                            v-model:value="
                                                                form.suspension
                                                            "
                                                            placeholder="Please enter suspension type"
                                                        />
                                                    </a-form-item>
                                                </a-col>

                                                <a-col :span="12">
                                                    <a-form-item
                                                        label="Description"
                                                        name="description"
                                                        :rules="[
                                                            {
                                                                required: false,
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
    name: "VehicleBrand",
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

        const tableDataScource = ref([]);

        const fetchVehicleBrands = async () => {
            try {
                const response = await DataService.get("/vehicle/brand");
                console.log("Vehicle brands fetched", response.data);
                if (response.status === 200) {
                    if (Array.isArray(response.data.Vehicle_brands)) {
                        // Format the data to match the structure expected by DataTables
                        tableDataScource.value =
                            response.data.Vehicle_brands.map((brand) => ({
                                id: `#${brand.id}`,
                                key: brand.id,
                                model: (
                                    <span class="ninjadash-username">
                                        {brand.model}
                                    </span>
                                ),
                                year: <span>{brand.year}</span>,
                                axles: brand.axles,
                                gearbox: brand.gearbox,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${brand.status}`}
                                    >
                                        {brand.status}
                                    </span>
                                ),
                            }));
                    } else {
                        // No vehicle brands found, handle accordingly
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                    //toast.error("Failed to fetch drivers. Please try again.");
                }
            } catch (error) {
                console.error("Error fetching vehicle brands:", error);
                toast.error("An error occurred. Please try again.");
            }
        };
        const viewVehicleBrand = (brandId) => {
            router.push(`/app/vehicle-brands/${brandId}`);
        };

        const editVehicleBrand = (brandId) => {
            router.push(`/app/vehicle-brands/edit/${brandId}`);
        };
        const deleteVehicleBrand = async (brandId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this brand? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/vehicle/brand/${brandId}`);
                    toast.success("Vehicle Brand deleted successfully.");
                    await fetchVehicleBrands(); // Refresh the list
                } catch (error) {
                    toast.error("Failed to delete brand. Please try again.");
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
                title: "Model",
                dataIndex: "model",
                key: "user",
            },
            {
                title: "Year",
                dataIndex: "year",
                key: "coutry",
            },

            {
                title: "Axles",
                dataIndex: "axles",
                key: "position",
            },
            {
                title: "Gearbox",
                dataIndex: "gearbox",
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
                                onClick={() => viewVehicleBrand(record.key)}
                            >
                                <unicon name="eye"></unicon>
                            </button>
                            <button
                                class="edit"
                                onClick={() => editVehicleBrand(record.key)}
                            >
                                <unicon name="edit"></unicon>
                            </button>
                            <button
                                class="delete"
                                onClick={() => deleteVehicleBrand(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        onMounted(async () => {
            await fetchVehicleBrands(); // Fetch drivers when the component mounts
        });

        const form = reactive({
            model: "",
            year: "",
            axles: "",
            gearbox: "",
            vehicle_length: "",
            width: "",
            height: "",
            suspension: "",
            description: "",
            fuel_consumption: "",
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
                !form.model ||
                !form.year ||
                !form.vehicle_length ||
                !form.width ||
                !form.height ||
                !form.fuel_consumption
            ) {
                toast.error("Please fill in all required fields.");
                return; // Prevent form submission
            }

            const formData = new FormData();

            // Append existing form fields
            formData.append("model", form.model);
            formData.append("year", form.year);

            formData.append("axles", form.axles);

            formData.append("fuel_consumption", form.fuel_consumption);

            formData.append("gearbox", form.gearbox);
            formData.append("vehicle_length", form.vehicle_length);
            formData.append("width", form.width);
            formData.append("height", form.height);
            formData.append("suspension", form.suspension);
            formData.append("description", form.description);

            try {
                isLoading.value = true;
                const response = await DataService.post(
                    "/vehicle/brand",
                    formData,
                );

                console.log(
                    "Vehicle Brand  response after post",
                    response.data,
                );

                if (response.status === 201) {
                    tableDataScource.value.push({
                        // id: `#${response.data.id}`,
                        key: response.data.Vehicle_brand.id,
                        model: (
                            <span class="ninjadash-username">{form.model}</span>
                        ),
                        year: <span>{response.data.Vehicle_brand.year}</span>,
                        axles: response.data.Vehicle_brand.axles,
                        gearbox: response.data.Vehicle_brand.gearbox,
                        status: (
                            <span
                                class={`ninjadash-status ninjadash-status-${response.data.status}`}
                            >
                                {response.data.status}
                            </span>
                        ),
                    });

                    toast.success("Record Added Successfully");
                    // Reset the form data to its initial state
                    form.model = "";
                    form.year = "";
                    form.axles = "";
                    form.gearbox = "";
                    form.vehicle_length = "";
                    form.width = "";
                    form.height = "";
                    form.suspension = "";
                    form.description = "";

                    // Close the drawer
                    open.value = false;

                    await fetchVehicleBrands();

                    router.push({
                        path: "/app/vehicle-brands",
                    });
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
            viewVehicleBrand,
            editVehicleBrand,
            deleteVehicleBrand,

            // handleCancel,
            // handlePreview,
            // fileList,
        };
    },
});
</script>

<style scoped>
.btn-submit {
    background-color: #0d79df;
    color: white;
}
</style>
