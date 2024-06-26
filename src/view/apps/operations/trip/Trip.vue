<template>
    <Main>
        <a-row :gutter="15">
            <a-col :xs="24">
                <BorderLessHeading>
                    <sdCards title="Manage Trips">
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
                                    title="Create New Trip"
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
                                        <WizardWrapper>
                                            <WizardThree>
                                                <Steps
                                                    isSwitch
                                                    :current="current"
                                                    :status="status"
                                                    :steps="steps"
                                                    @onNext="next"
                                                    @onPrev="prev"
                                                    @onDone="done"
                                                    :isFinished="isFinished"
                                                >
                                                    <template #step_one>
                                                        <BasicFormWrapper
                                                            class="basic-form-inner"
                                                        >
                                                            <div
                                                                class="ninjadash-form-checkout"
                                                            >
                                                                <a-row
                                                                    :gutter="12"
                                                                    justify="left"
                                                                >
                                                                    <a-col
                                                                        style="
                                                                            margin-left: 20px;
                                                                        "
                                                                        :sm="22"
                                                                        :xs="24"
                                                                    >
                                                                        <a-form-item
                                                                            label="Client"
                                                                            name="client_id"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Select Client',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <select
                                                                                v-model="
                                                                                    formState.client_id
                                                                                "
                                                                                class="custom-select"
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Select
                                                                                    Client
                                                                                </option>
                                                                                <option
                                                                                    v-for="client in clients"
                                                                                    :key="
                                                                                        client.id
                                                                                    "
                                                                                    :value="
                                                                                        client.id
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        client
                                                                                            .user
                                                                                            .first_name
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        style="
                                                                            margin-left: 20px;
                                                                        "
                                                                        :sm="22"
                                                                        :xs="24"
                                                                    >
                                                                        <a-form-item
                                                                            name="name"
                                                                            label="Trip Name"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Trip Name is Required',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-input
                                                                                style="
                                                                                    width: 300px;
                                                                                "
                                                                                v-model:value="
                                                                                    form.name
                                                                                "
                                                                                placeholder=""
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        style="
                                                                            margin-left: 20px;
                                                                        "
                                                                        :sm="22"
                                                                        :xs="24"
                                                                    >
                                                                        <a-form-item
                                                                            name="description"
                                                                            label="Trip Description"
                                                                        >
                                                                            <textarea
                                                                                v-model="
                                                                                    form.description
                                                                                "
                                                                                placeholder=""
                                                                                style="
                                                                                    height: 80px;
                                                                                    width: 300px;
                                                                                    border-radius: 5px;
                                                                                    outline: 0.5px;
                                                                                    border-color: grey;
                                                                                "
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>
                                                                </a-row>
                                                            </div>
                                                        </BasicFormWrapper>
                                                    </template>

                                                    <template #step_two>
                                                        <BasicFormWrapper
                                                            class="basic-form-inner"
                                                        >
                                                            <div
                                                                class="ninjadash-form-checkout"
                                                            >
                                                                <a-row
                                                                    justify="left"
                                                                >
                                                                    <a-col
                                                                        :sm="22"
                                                                        :xs="24"
                                                                        :lg="6"
                                                                        style="
                                                                            margin-left: -60px;
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="shipping-form"
                                                                        >
                                                                            <TodoStyleWrapper>
                                                                                <div
                                                                                    class="new-todo-wrap"
                                                                                >
                                                                                    <sdButton
                                                                                        @click="
                                                                                            showModalForPickup
                                                                                        "
                                                                                        class="btn-toDoAdd"
                                                                                        transparented
                                                                                        type="primary"
                                                                                        size="lg"
                                                                                    >
                                                                                        +
                                                                                        Add
                                                                                        New
                                                                                        Pick
                                                                                        Up
                                                                                        Location
                                                                                    </sdButton>
                                                                                </div>
                                                                            </TodoStyleWrapper>
                                                                        </div>
                                                                        <div>
                                                                            <h4
                                                                                style="
                                                                                    margin-left: 30px;
                                                                                    margin-top: 30px;
                                                                                    font-color: black;
                                                                                "
                                                                            >
                                                                                Pickup
                                                                                Location
                                                                            </h4>
                                                                            <ul>
                                                                                <li
                                                                                    v-for="(
                                                                                        pickup,
                                                                                        index
                                                                                    ) in pickupItems"
                                                                                    :key="
                                                                                        index
                                                                                    "
                                                                                >
                                                                                    <strong
                                                                                        >Location:</strong
                                                                                    >
                                                                                    {{
                                                                                        pickup.location
                                                                                    }}
                                                                                    <ul>
                                                                                        <li
                                                                                            v-for="(
                                                                                                item,
                                                                                                idx
                                                                                            ) in pickup.items"
                                                                                            :key="
                                                                                                idx
                                                                                            "
                                                                                        >
                                                                                            {{
                                                                                                item.itemDescription
                                                                                            }}
                                                                                            -
                                                                                            {{
                                                                                                item.quantity
                                                                                            }}
                                                                                        </li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </a-col>

                                                                    <a-col
                                                                        :sm="22"
                                                                        :xs="24"
                                                                        :lg="6"
                                                                        style="
                                                                            margin-left: 350px;
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="shipping-form"
                                                                        >
                                                                            <TodoStyleWrapper>
                                                                                <div
                                                                                    class="new-todo-wrap"
                                                                                >
                                                                                    <sdButton
                                                                                        @click="
                                                                                            showModalForDest
                                                                                        "
                                                                                        class="btn-toDoAdd"
                                                                                        transparented
                                                                                        type="primary"
                                                                                        size="lg"
                                                                                    >
                                                                                        +
                                                                                        Add
                                                                                        New
                                                                                        Destination
                                                                                    </sdButton>
                                                                                </div>
                                                                            </TodoStyleWrapper>
                                                                        </div>
                                                                        <div>
                                                                            <h4
                                                                                style="
                                                                                    margin-left: 30px;
                                                                                    margin-top: 30px;
                                                                                    font-color: black;
                                                                                "
                                                                            >
                                                                                Destinations
                                                                            </h4>
                                                                            <ul>
                                                                                <li
                                                                                    v-for="(
                                                                                        destination,
                                                                                        index
                                                                                    ) in destinations"
                                                                                    :key="
                                                                                        index
                                                                                    "
                                                                                >
                                                                                    <strong
                                                                                        >Destination:</strong
                                                                                    >
                                                                                    {{
                                                                                        destination.location
                                                                                    }}
                                                                                    <ul>
                                                                                        <li
                                                                                            v-for="(
                                                                                                item,
                                                                                                idx
                                                                                            ) in destination.items"
                                                                                            :key="
                                                                                                idx
                                                                                            "
                                                                                        >
                                                                                            {{
                                                                                                item
                                                                                            }}
                                                                                        </li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>

                                                                        <sdModal
                                                                            type="primary"
                                                                            title="Add New Pick Up Location"
                                                                            :visible="
                                                                                visibleForPickup
                                                                            "
                                                                            :footer="
                                                                                null
                                                                            "
                                                                            :onCancel="
                                                                                handleCancelModalForPickup
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="todo-modal"
                                                                            >
                                                                                <BasicFormWrapper>
                                                                                    <a-form
                                                                                        class="adTodo-form"
                                                                                        name="todoAdd"
                                                                                        :model="
                                                                                            formState1
                                                                                        "
                                                                                        @finish="
                                                                                            onSubmitHandler
                                                                                        "
                                                                                    >
                                                                                        <a-input
                                                                                            v-model:value="
                                                                                                formState1.location
                                                                                            "
                                                                                            placeholder="Enter New Pick Up Location..."
                                                                                        />

                                                                                        <br />
                                                                                        <br />
                                                                                        <br />
                                                                                        <br />
                                                                                        <br />

                                                                                        <table
                                                                                            class="table"
                                                                                        >
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>
                                                                                                        Item
                                                                                                        Description
                                                                                                    </th>
                                                                                                    <th>
                                                                                                        Quantity
                                                                                                    </th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                <tr
                                                                                                    v-for="(
                                                                                                        item,
                                                                                                        index
                                                                                                    ) in lineItems"
                                                                                                    :key="
                                                                                                        index
                                                                                                    "
                                                                                                >
                                                                                                    <td>
                                                                                                        <textarea
                                                                                                            style="
                                                                                                                width: 200px;
                                                                                                                height: 80px;
                                                                                                                border-radius: 5px;
                                                                                                            "
                                                                                                            class=""
                                                                                                            type="text"
                                                                                                            v-model="
                                                                                                                item.itemDescription
                                                                                                            "
                                                                                                        />
                                                                                                    </td>
                                                                                                    <td>
                                                                                                        <input
                                                                                                            class="input-data"
                                                                                                            type="text"
                                                                                                            v-model="
                                                                                                                item.quantity
                                                                                                            "
                                                                                                        />
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                        <div
                                                                                            style="
                                                                                                margin-top: 15px;
                                                                                                display: flex;
                                                                                                justify-content: space-between;
                                                                                            "
                                                                                        >
                                                                                            <sdButton
                                                                                                size="small"
                                                                                                type="primary"
                                                                                                @click.prevent="
                                                                                                    addLineItem
                                                                                                "
                                                                                            >
                                                                                                +
                                                                                                add
                                                                                                New
                                                                                                Line
                                                                                                Item
                                                                                            </sdButton>

                                                                                            <sdButton
                                                                                                size="small"
                                                                                                type="danger"
                                                                                                @click.prevent="
                                                                                                    removeLastLineItem
                                                                                                "
                                                                                            >
                                                                                                -
                                                                                                remove
                                                                                                Line
                                                                                                Item
                                                                                            </sdButton>
                                                                                        </div>

                                                                                        <sdButton
                                                                                            @click="
                                                                                                savePickupLocation
                                                                                            "
                                                                                            htmlType="submit"
                                                                                            class="btn-adTodo"
                                                                                            type="primary"
                                                                                            size="sm"
                                                                                            style="
                                                                                                margin-top: 50px;
                                                                                            "
                                                                                        >
                                                                                            Save
                                                                                        </sdButton>
                                                                                    </a-form>
                                                                                </BasicFormWrapper>
                                                                            </div>
                                                                        </sdModal>

                                                                        <sdModal
                                                                            type="primary"
                                                                            title="Add New Destination"
                                                                            :visible="
                                                                                visibleForDestination
                                                                            "
                                                                            :footer="
                                                                                null
                                                                            "
                                                                            :onCancel="
                                                                                handleCancelModalForDest
                                                                            "
                                                                        >
                                                                            <div
                                                                                class="todo-modal"
                                                                            >
                                                                                <BasicFormWrapper>
                                                                                    <a-form
                                                                                        class="adTodo-form"
                                                                                        name="todoAdd"
                                                                                        :model="
                                                                                            destinationFormState
                                                                                        "
                                                                                        @finish="
                                                                                            onSubmitHandler
                                                                                        "
                                                                                    >
                                                                                        <a-input
                                                                                            v-model:value="
                                                                                                destinationFormState.location
                                                                                            "
                                                                                            placeholder="Enter New Destination..."
                                                                                        />
                                                                                        <br />
                                                                                        <br />

                                                                                        <select
                                                                                            v-model="
                                                                                                selectedPickupItem
                                                                                            "
                                                                                            class="custom-select"
                                                                                        >
                                                                                            <option
                                                                                                value=""
                                                                                            >
                                                                                                Select
                                                                                                Item
                                                                                                from
                                                                                                Pickup
                                                                                                List
                                                                                            </option>
                                                                                            <option
                                                                                                v-for="item in allPickupItems"
                                                                                                :key="
                                                                                                    item.itemDescription
                                                                                                "
                                                                                                :value="
                                                                                                    item.itemDescription
                                                                                                "
                                                                                                :disabled="
                                                                                                    isItemSelected(
                                                                                                        item.itemDescription,
                                                                                                    )
                                                                                                "
                                                                                            >
                                                                                                {{
                                                                                                    item.itemDescription
                                                                                                }}
                                                                                            </option>
                                                                                        </select>
                                                                                        <br />
                                                                                        <br />

                                                                                        <sdButton
                                                                                            @click="
                                                                                                saveDestination
                                                                                            "
                                                                                            htmlType="submit"
                                                                                            class="btn-adTodo"
                                                                                            type="primary"
                                                                                            size="lg"
                                                                                        >
                                                                                            Save
                                                                                        </sdButton>
                                                                                    </a-form>
                                                                                </BasicFormWrapper>
                                                                            </div>
                                                                        </sdModal>
                                                                    </a-col>
                                                                </a-row>
                                                            </div>
                                                        </BasicFormWrapper>
                                                    </template>

                                                    <template #step_three>
                                                        <BasicFormWrapper
                                                            class="basic-form-inner"
                                                        >
                                                            <div
                                                                class="ninjadash-form-checkout"
                                                            >
                                                                <a-row
                                                                    justify="left"
                                                                >
                                                                    <a-col
                                                                        :sm="22"
                                                                        :xs="24"
                                                                    >
                                                                        <div
                                                                            class="payment-method-form profile-hints"
                                                                        >
                                                                            <a-form-item
                                                                                label="Assign or Select Drivers"
                                                                                name="driver_ids"
                                                                                :rules="[
                                                                                    {
                                                                                        required: true,
                                                                                        message:
                                                                                            'Select at least a driver',
                                                                                    },
                                                                                ]"
                                                                            >
                                                                                <select
                                                                                    v-model="
                                                                                        form.driver_ids
                                                                                    "
                                                                                    multiple
                                                                                    class="custom-select"
                                                                                    style="
                                                                                        width: 100%;
                                                                                    "
                                                                                    placeholder="Please assign a driver"
                                                                                >
                                                                                    <option
                                                                                        v-for="driver in drivers"
                                                                                        :key="
                                                                                            driver.id
                                                                                        "
                                                                                        :value="
                                                                                            driver.id
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            driver.first_name
                                                                                        }}
                                                                                    </option>
                                                                                </select>
                                                                            </a-form-item>
                                                                        </div>
                                                                    </a-col>
                                                                </a-row>

                                                                <a-row
                                                                    :gutter="16"
                                                                >
                                                                    <a-col
                                                                        :span="
                                                                            12
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Fuel Purchase Reference Number"
                                                                            name="fuel_purchase_id"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Please select reference number!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <select
                                                                                v-model="
                                                                                    form.fuel_purchase_id
                                                                                "
                                                                                class="custom-select"
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Select
                                                                                    fuel
                                                                                    purchase
                                                                                    reference
                                                                                    no
                                                                                </option>
                                                                                <option
                                                                                    v-for="purchase in fuelPurchaseOrders"
                                                                                    :key="
                                                                                        purchase.id
                                                                                    "
                                                                                    :value="
                                                                                        purchase.id
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        purchase.id
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        :span="
                                                                            12
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Delivery Note Reference Number"
                                                                            name="delivery_note_id"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Please select reference number!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <select
                                                                                v-model="
                                                                                    form.delivery_note_id
                                                                                "
                                                                                class="custom-select"
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Select
                                                                                    delivery
                                                                                    note
                                                                                    reference
                                                                                    no
                                                                                </option>
                                                                                <option
                                                                                    v-for="deliveryNote in deliveryNotes"
                                                                                    :key="
                                                                                        deliveryNote.id
                                                                                    "
                                                                                    :value="
                                                                                        deliveryNote.id
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        deliveryNote.id
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </a-form-item>
                                                                    </a-col>
                                                                </a-row>
                                                                <a-row
                                                                    :gutter="16"
                                                                >
                                                                    <a-col
                                                                        :span="
                                                                            12
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Quantity"
                                                                            name="quantity"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Enter quantity!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-input
                                                                                v-model:value="
                                                                                    form.quantity
                                                                                "
                                                                                placeholder=""
                                                                                readonly
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        :span="
                                                                            12
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Quantity Measurement"
                                                                            name="quantity_abbreviation_id"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Field Required!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-input
                                                                                v-model:value="
                                                                                    form.quantity_abbreviation_name
                                                                                "
                                                                                placeholder=""
                                                                                readonly
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>
                                                                </a-row>
                                                                <a-row
                                                                    :gutter="16"
                                                                >
                                                                    <a-col
                                                                        :span="
                                                                            8
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Fuel Type"
                                                                            name="fuel_type"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Fuel type is needed!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-input
                                                                                type="text"
                                                                                v-model:value="
                                                                                    form.fuel_type
                                                                                "
                                                                                placeholder=""
                                                                                readonly
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        :span="
                                                                            8
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Truck"
                                                                            name="truck_id"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'truck is needed!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <!-- Dropdown for selecting trucks by registration number -->
                                                                            <select
                                                                                v-model="
                                                                                    form.selectedTruckRegistration
                                                                                "
                                                                                class="custom-select"
                                                                            >
                                                                                <option
                                                                                    value=""
                                                                                >
                                                                                    Select
                                                                                    Truck
                                                                                </option>
                                                                                <option
                                                                                    v-for="vehicle in vehicles"
                                                                                    :key="
                                                                                        vehicle.id
                                                                                    "
                                                                                    :value="
                                                                                        vehicle.registration_no
                                                                                    "
                                                                                >
                                                                                    {{
                                                                                        vehicle.registration_no
                                                                                    }}
                                                                                </option>
                                                                            </select>
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        :span="
                                                                            8
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Odometer Reading"
                                                                            name="odometer_reading"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Enter odometer reading',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-input
                                                                                type="text"
                                                                                v-model:value="
                                                                                    form.odometer_reading
                                                                                "
                                                                                placeholder="Enter Odometer reading"
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>
                                                                </a-row>
                                                                <a-row
                                                                    :gutter="16"
                                                                >
                                                                    <a-col
                                                                        :span="
                                                                            12
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Dispensation Date"
                                                                            name="dispense_date"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Please select date!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-date-picker
                                                                                v-model:value="
                                                                                    form.dispense_date
                                                                                "
                                                                                style="
                                                                                    width: 100%;
                                                                                "
                                                                                :get-popup-container="
                                                                                    (
                                                                                        trigger,
                                                                                    ) =>
                                                                                        trigger.parentElement
                                                                                "
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>

                                                                    <a-col
                                                                        :span="
                                                                            12
                                                                        "
                                                                    >
                                                                        <a-form-item
                                                                            label="Dispense Location"
                                                                            name="dispense_location"
                                                                            :rules="[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        'Please enter dispense location!',
                                                                                },
                                                                            ]"
                                                                        >
                                                                            <a-input
                                                                                type="text"
                                                                                v-model:value="
                                                                                    form.dispense_location
                                                                                "
                                                                                placeholder="Enter Dispense Location"
                                                                            />
                                                                        </a-form-item>
                                                                    </a-col>
                                                                </a-row>
                                                            </div>
                                                        </BasicFormWrapper>
                                                    </template>

                                                    <template #summary>
                                                        <BasicFormWrapper
                                                            v-if="
                                                                status !==
                                                                'finish'
                                                            "
                                                            :style="{
                                                                width: '100%',
                                                            }"
                                                        >
                                                            <a-form
                                                                :model="
                                                                    formState
                                                                "
                                                                layout="vertical"
                                                            >
                                                                <div
                                                                    class="ninjadash-finish-order"
                                                                    :style="{
                                                                        width: '100%',
                                                                    }"
                                                                >
                                                                    <div>
                                                                        <p>
                                                                            Client:
                                                                            {{
                                                                                formState.client_id
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Trip
                                                                            Name:
                                                                            {{
                                                                                form.name
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Trip
                                                                            Description:
                                                                            {{
                                                                                form.description
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Pickup
                                                                            Locations:
                                                                        </p>
                                                                        <ul>
                                                                            <li
                                                                                v-for="(
                                                                                    pickup,
                                                                                    index
                                                                                ) in pickupItems"
                                                                                :key="
                                                                                    index
                                                                                "
                                                                            >
                                                                                <strong
                                                                                    >Location:</strong
                                                                                >
                                                                                {{
                                                                                    pickup.location
                                                                                }}
                                                                                <ul>
                                                                                    <li
                                                                                        v-for="(
                                                                                            item,
                                                                                            idx
                                                                                        ) in pickup.items"
                                                                                        :key="
                                                                                            idx
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            item.itemDescription
                                                                                        }}
                                                                                        -
                                                                                        {{
                                                                                            item.quantity
                                                                                        }}
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                        <p>
                                                                            Destinations:
                                                                        </p>
                                                                        <ul>
                                                                            <li
                                                                                v-for="(
                                                                                    destination,
                                                                                    index
                                                                                ) in destinations"
                                                                                :key="
                                                                                    index
                                                                                "
                                                                            >
                                                                                <strong
                                                                                    >Destination:</strong
                                                                                >
                                                                                {{
                                                                                    destination.location
                                                                                }}
                                                                                <ul>
                                                                                    <li
                                                                                        v-for="(
                                                                                            item,
                                                                                            idx
                                                                                        ) in destination.items"
                                                                                        :key="
                                                                                            idx
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            item
                                                                                        }}
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                        <p>
                                                                            Drivers:
                                                                            {{
                                                                                form.driver_ids.join(
                                                                                    ", ",
                                                                                )
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Fuel
                                                                            Purchase
                                                                            Reference:
                                                                            {{
                                                                                form.fuel_purchase_id
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Delivery
                                                                            Note
                                                                            Reference:
                                                                            {{
                                                                                form.delivery_note_id
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Quantity:
                                                                            {{
                                                                                form.quantity
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Quantity
                                                                            Measurement:
                                                                            {{
                                                                                form.quantity_abbreviation_name
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Fuel
                                                                            Type:
                                                                            {{
                                                                                form.fuel_type
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Truck:
                                                                            {{
                                                                                form.selectedTruckRegistration
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Odometer
                                                                            Reading:
                                                                            {{
                                                                                form.odometer_reading
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Dispensation
                                                                            Date:
                                                                            {{
                                                                                form.dispense_date
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            Dispense
                                                                            Location:
                                                                            {{
                                                                                form.dispense_location
                                                                            }}
                                                                        </p>
                                                                    </div>
                                                                    <a-checkbox
                                                                        v-model:checked="
                                                                            checked
                                                                        "
                                                                    >
                                                                        <span
                                                                            class="checkbox-label"
                                                                            >I
                                                                            Agree
                                                                            with
                                                                            the
                                                                            Terms
                                                                            and
                                                                            Conditions.</span
                                                                        >
                                                                    </a-checkbox>
                                                                </div>
                                                            </a-form>
                                                        </BasicFormWrapper>

                                                        <a-row
                                                            v-else
                                                            justify="center"
                                                            :style="{
                                                                width: '100%',
                                                            }"
                                                        >
                                                            <a-col
                                                                :xl="24"
                                                                :xs="24"
                                                            >
                                                                <div
                                                                    class="checkout-successful"
                                                                >
                                                                    <sdCards
                                                                        headless
                                                                        :bodyStyle="{
                                                                            borderRadius:
                                                                                '20px',
                                                                        }"
                                                                    >
                                                                        <sdCards
                                                                            headless
                                                                        >
                                                                            <span
                                                                                class="icon-success"
                                                                            >
                                                                                <unicon
                                                                                    name="check"
                                                                                ></unicon>
                                                                            </span>
                                                                            <sdHeading
                                                                                as="h3"
                                                                                >Thank
                                                                                You</sdHeading
                                                                            >
                                                                            <p>
                                                                                Your
                                                                                trip
                                                                                has
                                                                                started
                                                                                successfully
                                                                            </p>
                                                                        </sdCards>
                                                                    </sdCards>
                                                                </div>
                                                            </a-col>
                                                        </a-row>
                                                    </template>
                                                </Steps>
                                            </WizardThree>
                                        </WizardWrapper>
                                    </template>
                                </a-drawer>
                            </a-col>
                        </a-row>

                        <sdModal
                            title="Update Trip information"
                            class="ninjadash_addTask-modal"
                            :type="modalType"
                            :visible="visible"
                            :footer="null"
                            :onCancel="handleCancel"
                        >
                            <BasicFormWrapper>
                                <a-form
                                    :model="formState"
                                    name="end-trip"
                                    @finish="handleEndTrip"
                                >
                                    <a-form-item
                                        label="Trip Status"
                                        name="trip_status"
                                        :rules="[
                                            {
                                                required: true,
                                                message:
                                                    'Trip Status is required',
                                            },
                                        ]"
                                    >
                                        <select
                                            v-model="formState.trip_status"
                                            class="custom-select"
                                        >
                                            <option value="">
                                                Select Trip Status
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </a-form-item>

                                    <a-row :gutter="16">
                                        <a-col :span="16">
                                            <a-form-item
                                                label="Trip Weight"
                                                name="trip_weight"
                                                :rules="[{ required: false }]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.trip_weight
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>

                                    <a-row :gutter="16">
                                        <a-col :span="16">
                                            <a-form-item
                                                label="KMS Done"
                                                name="kms_done"
                                                :rules="[{ required: false }]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.kms_done
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>

                                    <a-row :gutter="16">
                                        <a-col :span="16">
                                            <a-form-item
                                                label="Litres Consumed"
                                                name="litres_consumed"
                                                :rules="[{ required: false }]"
                                            >
                                                <a-input
                                                    type="text"
                                                    v-model:value="
                                                        formState.litres_consumed
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>

                                    <a-row :gutter="16">
                                        <a-col :span="24">
                                            <a-form-item
                                                label="Note"
                                                name="description"
                                                :rules="[{ required: false }]"
                                            >
                                                <a-textarea
                                                    type="text"
                                                    v-model:value="
                                                        formState.description
                                                    "
                                                />
                                            </a-form-item>
                                        </a-col>
                                    </a-row>
                                    <div class="ninjadash-modal-actions">
                                        <sdButton
                                            size="sm"
                                            type="light"
                                            key="cancel"
                                            outlined
                                            @click="handleCancel"
                                            >Cancel</sdButton
                                        >
                                        <sdButton
                                            htmlType="submit"
                                            size="sm"
                                            type="primary"
                                            key="submit"
                                            >End Trip</sdButton
                                        >
                                    </div>
                                </a-form>
                            </BasicFormWrapper>
                        </sdModal>

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
import { WizardWrapper, WizardThree } from "./StyleWizard";
import { TodoStyleWrapper } from "./StyleModal";
import { DataService } from "@/config/dataService/dataService";
import { defineComponent, onMounted, watch, computed } from "vue";
import { Main } from "../../../styled";
import DataTables from "@/components/table/DataTable.vue";
import { BorderLessHeading, BasicFormWrapper } from "../../../styled";
import { reactive, ref } from "vue";
import Steps from "@/components/steps/steps";

import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "Trip",
    components: {
        Main,
        DataTables,
        BorderLessHeading,
        BasicFormWrapper,
        TodoStyleWrapper,
        Steps,
        WizardWrapper,
        WizardThree,
    },
    setup() {
        const router = useRouter();
        const toast = useToast();
        const status = ref("process");
        const isFinished = ref(false);
        const current = ref(0);
        const password = ref(123456);
        const confirm_password = ref();
        const paymentValue = ref("card");
        const shippingValue = ref("ms");
        const profile = reactive({
            fname: "",
            lname: "",
            email: "",
            address: "",
        });

        const isStepValid = ref(false);

        const validateStep = () => {
            let valid = true;
            switch (current.value) {
                case 0:
                    if (!formState.client_id || !form.name) {
                        toast.error(
                            "Please fill in all required fields in Step 1.",
                        );
                        valid = false;
                    }
                    break;
                case 1:
                    if (pickupItems.value.length === 0) {
                        toast.error(
                            "Please add at least one pickup location in Step 2.",
                        );
                        valid = false;
                    }
                    break;
                case 2:
                    if (
                        !form.driver_ids.length ||
                        !form.fuel_purchase_id ||
                        !form.delivery_note_id ||
                        !form.quantity ||
                        !form.fuel_type ||
                        !form.selectedTruckRegistration ||
                        !form.odometer_reading ||
                        !form.dispense_date ||
                        !form.dispense_location
                    ) {
                        toast.error(
                            "Please fill in all required fields in Step 3.",
                        );
                        valid = false;
                    }
                    break;
            }
            isStepValid.value = valid;
            return valid;
        };

        const next = () => {
            if (validateStep()) {
                status.value = "process";
                current.value = current.value + 1;
                isStepValid.value = false;
            }
        };

        const prev = () => {
            status.value = "process";
            current.value = current.value - 1;
        };

        const responsive = ref(0);
        const collapsed = ref(false);
        const visible = ref(false);
        const visibleForPickup = ref(false);
        const visibleForDestination = ref(false);
        const modalType = ref("primary");

        const isLoading = ref(false);

        const selectedTripId = ref(null);

        const drivers = ref([]);
        const clients = ref([]);
        const vehicles = ref([]);

        const fuelPurchaseOrders = ref([]);

        const tableDataScource = ref([]);

        const fetchAllData = async () => {
            await Promise.all([
                fetchTrips(),
                fetchDrivers(),
                fetchFuelPurchaseOrders(),
                fetchClients(),
                fetchVehicles(),
            ]);
        };

        const fetchTrips = async () => {
            try {
                const response = await DataService.get("/trips");

                if (response.status === 200) {
                    if (Array.isArray(response.data.Trips)) {
                        tableDataScource.value = response.data.Trips.map(
                            (trip) => ({
                                key: trip.id,
                                trip_type: (
                                    <span class="ninjadash-username">
                                        {trip.name}
                                    </span>
                                ),
                                start_location: <span>{trip.origin}</span>,
                                status: (
                                    <span
                                        class={`ninjadash-status ninjadash-status-${trip.trip_status}`}
                                    >
                                        {trip.trip_status}
                                    </span>
                                ),
                            }),
                        );
                    } else {
                        tableDataScource.value = [];
                    }
                } else {
                    return;
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await DataService.get(`/drivers`);
                drivers.value = response.data.Drivers;
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        const fetchVehicles = async () => {
            try {
                const response2 = await DataService.get(`/vehicle`);
                vehicles.value = response2.data.Vehicles;
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };

        const fetchFuelPurchaseOrders = async () => {
            try {
                const response5 = await DataService.get(`/fuel_purchase_order`);
                fuelPurchaseOrders.value = response5.data.Fuel_purchase_orders;
            } catch (error) {
                console.error("Error fetching fuel purchase orders :", error);
            }
        };
        const fetchClients = async () => {
            try {
                const response2 = await DataService.get(`/clients`);
                clients.value = response2.data.Clients;
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };

        const dataTableColumn = [
            {
                title: "Trip Type",
                dataIndex: "trip_type",
                key: "trip_type",
            },
            {
                title: "Start Location",
                dataIndex: "start_location",
                key: "start_location",
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
                    const statusText = record.status.children[0].children;

                    const isCompleted =
                        !statusText.includes("pending") &&
                        !statusText.includes("ongoing");
                    //  const isPending = statusText.includes("pending");
                    const isOngoing = statusText.includes("ongoing");

                    return (
                        <div class="table-actions">
                            {isCompleted && (
                                <button
                                    class="start"
                                    onClick={() => viewTrip(record.key)}
                                >
                                    <unicon name="eye"></unicon>
                                </button>
                            )}
                            {isOngoing && (
                                <button
                                    class="end"
                                    onClick={() => showModal(record.key)}
                                >
                                    <unicon name="truck"></unicon>
                                    <span>End Trip</span>
                                </button>
                            )}
                            {!isCompleted && (
                                <button
                                    class="edit"
                                    onClick={() => editTrip(record.key)}
                                >
                                    <unicon name="edit"></unicon>
                                </button>
                            )}
                            <button
                                class="delete"
                                onClick={() => deleteTrip(record.key)}
                            >
                                <unicon name="trash"></unicon>
                            </button>
                        </div>
                    );
                },
            },
        ];

        const viewTrip = (tripId) => {
            router.push(`/app/trips/${tripId}`);
        };

        const formState = reactive({
            client_id: "",
            trip_weight: "",
            trip_status: "",
            kms_done: "",
            litres_consumed: "",
            description: "",
        });

        const formState1 = reactive({
            location: "",
        });

        const destinationFormState = reactive({
            location: "",
        });

        const showModal = async (tripId) => {
            selectedTripId.value = tripId;

            const tripDetailsResponse = await DataService.get(
                `/trips/${tripId}`,
            );

            if (tripDetailsResponse.status === 200) {
                const tripDetails =
                    tripDetailsResponse.data.Fuel_dispensation_order;

                formState.litres_consumed = tripDetails.litres_consumed || "";
                formState.kms_done = tripDetails.kms_done || "";
                formState.trip_weight = tripDetails.trip_weight || "";
                formState.description = tripDetails.description || "";

                visible.value = true;
                collapsed.value = false;
            } else {
                console.error("Failed to fetch trip details");
            }
        };

        const editTrip = (tripId) => {
            router.push(`/app/trips/edit/${tripId}`);
        };
        const deleteTrip = async (tripId) => {
            if (
                window.confirm(
                    "Are you sure you want to delete this trip? This action cannot be undone.",
                )
            ) {
                try {
                    await DataService.delete(`/trips/${tripId}`);
                    toast.success("Trip deleted successfully.");
                    await fetchTrips();
                } catch (error) {
                    toast.error("Failed to delete trip. Please try again.");
                }
            }
        };

        const form = reactive({
            client_id: "",
            trip_weight: "",
            trip_status: "",
            description: "",
            name: "",
            origin: "",
            driver_ids: [],
            remarks: "",
            review_points: "",
            fuel_dispensation_id: "",
            value: "",
            previous_kms: "",
            previous_litres: "",
            litres_given: "",
            kms_done: "",
            fuel_purchase_id: "",
            delivery_note_id: "",
            fuel_type: "",
            quantity: "",
            quantity_abbreviation_name: "",
            quantity_abbreviation_id: "",
            dispense_date: "",
            odometer_reading: "",
            dispense_location: "",
            status: "",
            selectedTruckRegistration: "",
            truck_id: "",
        });

        const handleFileUpload = (event, fieldName) => {
            const file = event.target.files[0];
            if (file) {
                form[fieldName] = file;
            }
        };

        const handleSubmit = async () => {
            if (
                !form.name ||
                !form.origin ||
                !form.driver_ids ||
                !form.fuel_dispensation_id
            ) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const selectedFuelPurchaseId = fuelPurchaseOrders.value.find(
                (fuelPurchase) => fuelPurchase.id === form.fuel_purchase_id,
            );
            if (!selectedFuelPurchaseId) {
                toast.error("Please select item.");
                return;
            }

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("origin", form.origin);
            formData.append("driver_ids[]", form.driver_ids);
            formData.append("remarks", form.remarks);
            formData.append("review_points", form.review_points);
            formData.append("fuel_dispensation_id", form.fuel_dispensation_id);
            formData.append("value", form.value);
            formData.append("previous_kms", form.previous_kms);
            formData.append("previous_litres", form.previous_litres);
            formData.append("litres_given", form.litres_given);
            formData.append("litres_consumed", form.litres_consumed);
            formData.append("kms_done", form.kms_done);
            formData.append("trip_weight", form.trip_weight);
            formData.append("trip_status", form.trip_status);
            formData.append("description", form.description);

            try {
                isLoading.value = true;
                const response = await DataService.post("/trips", formData);

                if (response.status === 201) {
                    toast.success("Record Added Successfully");

                    form.name = "";
                    form.origin = "";
                    form.driver_ids = [];
                    form.fuel_dispensation_id = "";
                    form.remarks = "";
                    form.description = "";

                    open.value = false;

                    await fetchTrips();

                    router.push({
                        path: "/app/trips",
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

        onMounted(async () => {
            await fetchAllData();
        });
        const handleCancel = () => {
            visible.value = false;
        };

        const showModalForPickup = () => {
            visibleForPickup.value = true;
        };

        const onCancelModalForPickup = () => {
            visibleForPickup.value = false;
        };

        const handleCancelModalForPickup = () => {
            onCancelModalForPickup();
        };

        const showModalForDest = () => {
            visibleForDestination.value = true;
        };

        const onCancelModalForDest = () => {
            visibleForDestination.value = false;
        };

        const handleCancelModalForDest = () => {
            onCancelModalForDest();
        };

        const handleEndTrip = async () => {
            const updatedTripInfo = {
                ...formState,
            };

            try {
                const response = await DataService.put(
                    `/trips/${selectedTripId.value}`,
                    updatedTripInfo,
                );
                if (response.status === 200) {
                    toast.success("Trip updated successfully.");

                    await fetchTrips();
                    visible.value = false;
                } else {
                    toast.error("Failed to update trip. Please try again.");
                }
            } catch (error) {
                console.error("Error updating trip:", error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const done = async () => {
            const confirm = window.confirm(
                "Are you sure you want to start the trip?",
            );
            if (confirm) {
                status.value = "finish";
                isFinished.value = true;
                current.value = 0;

                // if (!formState.client_id || !form.name || !form.driver_ids) {
                //     toast.error("Please fill in all required fields.");
                //     return;
                // }

                try {
                    const tripDetails = {
                        ...formState,
                        pickupItems: pickupItems.value,
                        destinations: destinations.value,
                        fuel_purchase_id: form.fuel_purchase_id,
                        delivery_note_id: form.delivery_note_id,
                        quantity: form.quantity,
                        quantity_abbreviation_name:
                            form.quantity_abbreviation_name,
                        fuel_type: form.fuel_type,
                        selectedTruckRegistration:
                            form.selectedTruckRegistration,
                        odometer_reading: form.odometer_reading,
                        dispense_date: form.dispense_date,
                        dispense_location: form.dispense_location,
                    };

                    await DataService.post("/trips", tripDetails);

                    toast.success("Trip started successfully");
                    await fetchTrips();
                    router.push("/app/trips");
                } catch (error) {
                    console.error("Error starting trip:", error);
                    toast.error("An error occurred. Please try again.");
                }
            }
        };

        watch(
            () => form.fuel_purchase_id,
            (newVal) => {
                const selectedOrder = fuelPurchaseOrders.value.find(
                    (order) => order.id === newVal,
                );
                if (selectedOrder) {
                    form.fuel_type = selectedOrder.fuel_type;
                    form.quantity = selectedOrder.quantity;
                    form.quantity_abbreviation_name =
                        selectedOrder.quantityabbreviationid.name;
                    form.quantity_abbreviation_id =
                        selectedOrder.quantityabbreviationid.id;
                } else {
                    form.fuel_type = "";
                    form.quantity = "";
                    form.quantity_abbreviation_name = "";
                    form.quantity_abbreviation_id = "";
                }
            },
        );

        watch(
            () => form.selectedTruckRegistration,
            (newVal) => {
                const selectedTruck = vehicles.value.find(
                    (vehicle) => vehicle.registration_no === newVal,
                );
                if (selectedTruck) {
                    form.truck_id = selectedTruck.id;
                } else {
                    form.truck_id = "";
                }
            },
        );

        const lineItems = ref([
            {
                itemDescription: "",
                quantity: "",
                amount: "",
            },
        ]);

        const pickupItems = ref([]);
        const destinations = ref([]);
        const selectedPickupItem = ref("");
        const allPickupItems = computed(() => {
            return pickupItems.value.flatMap((pickup) => pickup.items);
        });

        const addLineItem = () => {
            lineItems.value.push({
                itemDescription: "",
                quantity: "",
                amount: "",
            });
        };

        const removeLastLineItem = () => {
            if (lineItems.value.length > 1) {
                lineItems.value.pop();
            } else {
                toast.warning("Cannot remove the last line item.");
            }
        };

        const savePickupLocation = () => {
            if (!formState1.location) {
                toast.error("Please enter a pickup location.");
                return;
            }

            pickupItems.value.push({
                location: formState1.location,
                items: [...lineItems.value],
            });

            visibleForPickup.value = false;
            lineItems.value = [
                { itemDescription: "", quantity: "", amount: "" },
            ];
            formState1.location = "";
        };

        const isItemSelected = (itemDescription) => {
            return destinations.value.some((dest) =>
                dest.items.includes(itemDescription),
            );
        };

        const saveDestination = () => {
            if (!destinationFormState.location) {
                toast.error("Please enter a destination.");
                return;
            }

            if (!selectedPickupItem.value) {
                toast.error(
                    "Please select at least one item from the pickup list.",
                );
                return;
            }

            destinations.value.push({
                location: destinationFormState.location,
                items: [selectedPickupItem.value],
            });

            visibleForDestination.value = false;
            selectedPickupItem.value = "";
            destinationFormState.location = "";
        };

        return {
            tableDataScource,
            dataTableColumn,
            form,
            done,
            open,
            showDrawer,
            addLineItem,
            removeLastLineItem,
            lineItems,
            pickupItems,
            destinations,
            selectedPickupItem,
            allPickupItems,
            onClose,
            handleSubmit,
            isLoading,
            handleFileUpload,
            fuelPurchaseOrders,
            drivers,
            visible,
            visibleForPickup,
            showModalForDest,
            onCancelModalForDest,
            handleCancelModalForDest,
            visibleForDestination,
            modalType,
            showModal,
            responsive,
            handleCancel,
            formState,
            formState1,
            destinationFormState,
            handleEndTrip,
            paymentValue,
            shippingValue,
            clients,
            vehicles,

            prev,
            next,

            status,
            isFinished,
            current,
            profile,
            password,
            confirm_password,
            checked: ref(false),
            handleCancelModalForPickup,
            onCancelModalForPickup,
            showModalForPickup,
            steps: [
                {
                    title: "Step One",
                    content: "step_one",
                },
                {
                    title: "Step Two",
                    content: "step_two",
                },
                {
                    title: "Step Three",
                    content: "step_three",
                },
                {
                    title: "Summary",
                    content: "summary",
                },
            ],
            savePickupLocation,
            saveDestination,
            isItemSelected,
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

.input-data {
    width: 150px;
    height: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 0.5px solid gray;
}
</style>
