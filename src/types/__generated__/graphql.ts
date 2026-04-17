export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthData = {
  __typename: 'AuthData';
  token: Scalars['String']['output'];
};

export type CreateDeviceInput = {
  employeeId: Scalars['ID']['input'];
  manufacturer: Scalars['String']['input'];
  model: Scalars['String']['input'];
  os: Scalars['String']['input'];
  serialNumber: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  fullname: Scalars['String']['input'];
  unitId: Scalars['ID']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateUnitInput = {
  location?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateVpnProfileInput = {
  ipAddress: Scalars['String']['input'];
  profileCode: Scalars['String']['input'];
  profileTypeId: Scalars['ID']['input'];
};

export type CreateVpnProfileTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Device = {
  __typename: 'Device';
  employee: Employee;
  id: Scalars['ID']['output'];
  manufacturer: Scalars['String']['output'];
  model: Scalars['String']['output'];
  os: Scalars['String']['output'];
  serialNumber: Scalars['String']['output'];
  vpnProfile: Maybe<VpnProfile>;
};

export type Employee = {
  __typename: 'Employee';
  contactInfo: Maybe<Scalars['String']['output']>;
  fullname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  unit: Unit;
};

export type Mutation = {
  __typename: 'Mutation';
  assignVpnProfileToDevice: Device;
  changeVpnProfileType: VpnProfile;
  createDevice: Device;
  createEmployee: Employee;
  createUnit: Unit;
  createVpnProfile: VpnProfile;
  createVpnProfileType: VpnProfileType;
  deleteDevice: Device;
  deleteEmployee: Employee;
  deleteUnit: Unit;
  deleteVpnProfile: VpnProfile;
  deleteVpnProfileType: VpnProfileType;
  unassignVpnProfileFromDevice: Device;
  updateDevice: Device;
  updateEmployee: Employee;
  updateUnit: Unit;
  updateVpnProfile: VpnProfile;
  updateVpnProfileType: VpnProfileType;
};


export type MutationAssignVpnProfileToDeviceArgs = {
  deviceId: Scalars['ID']['input'];
  vpnProfileId: Scalars['ID']['input'];
};


export type MutationChangeVpnProfileTypeArgs = {
  newTypeId: Scalars['ID']['input'];
  vpnProfileId: Scalars['ID']['input'];
};


export type MutationCreateDeviceArgs = {
  devicePayload: CreateDeviceInput;
};


export type MutationCreateEmployeeArgs = {
  employeePayload: CreateEmployeeInput;
};


export type MutationCreateUnitArgs = {
  unitPayload: CreateUnitInput;
};


export type MutationCreateVpnProfileArgs = {
  vpnProfilePayload: CreateVpnProfileInput;
};


export type MutationCreateVpnProfileTypeArgs = {
  vpnProfileTypePayload: CreateVpnProfileTypeInput;
};


export type MutationDeleteDeviceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUnitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVpnProfileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVpnProfileTypeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnassignVpnProfileFromDeviceArgs = {
  deviceId: Scalars['ID']['input'];
};


export type MutationUpdateDeviceArgs = {
  devicePayload: UpdateDeviceInput;
};


export type MutationUpdateEmployeeArgs = {
  employeePayload: UpdateEmployeeInput;
};


export type MutationUpdateUnitArgs = {
  unitPayload: UpdateUnitInput;
};


export type MutationUpdateVpnProfileArgs = {
  vpnProfilePayload: UpdateVpnProfileInput;
};


export type MutationUpdateVpnProfileTypeArgs = {
  vpnProfileTypePayload: UpdateVpnProfileTypeInput;
};

export type Query = {
  __typename: 'Query';
  device: Maybe<Device>;
  devices: Array<Device>;
  employee: Maybe<Employee>;
  employees: Array<Employee>;
  login: AuthData;
  unit: Maybe<Unit>;
  units: Array<Unit>;
  vpnProfile: Maybe<VpnProfile>;
  vpnProfileType: Maybe<VpnProfileType>;
  vpnProfileTypes: Array<VpnProfileType>;
  vpnProfiles: Array<VpnProfile>;
};


export type QueryDeviceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEmployeeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryUnitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVpnProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVpnProfileTypeArgs = {
  id: Scalars['ID']['input'];
};

export type Unit = {
  __typename: 'Unit';
  id: Scalars['ID']['output'];
  location: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type UpdateDeviceInput = {
  employeeId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  manufacturer?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  os?: InputMaybe<Scalars['String']['input']>;
  serialNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeInput = {
  contactInfo?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  unitId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUnitInput = {
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVpnProfileInput = {
  id: Scalars['ID']['input'];
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  profileCode?: InputMaybe<Scalars['String']['input']>;
  profileTypeId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateVpnProfileTypeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type VpnProfile = {
  __typename: 'VpnProfile';
  device: Maybe<Device>;
  id: Scalars['ID']['output'];
  ipAddress: Scalars['String']['output'];
  profileCode: Scalars['String']['output'];
  profileType: VpnProfileType;
};

export type VpnProfileType = {
  __typename: 'VpnProfileType';
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type EmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type EmployeesQuery = { employees: Array<{ __typename: 'Employee', id: string, fullname: string, contactInfo: string | null, unit: { __typename: 'Unit', id: string, title: string } }> };

export type UnitsForEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitsForEmployeesQuery = { units: Array<{ __typename: 'Unit', id: string, title: string }> };

export type CreateEmployeeMutationVariables = Exact<{
  employeePayload: CreateEmployeeInput;
}>;


export type CreateEmployeeMutation = { createEmployee: { __typename: 'Employee', contactInfo: string | null, fullname: string, id: string, unit: { __typename: 'Unit', id: string, title: string } } };

export type UpdateEmployeeMutationVariables = Exact<{
  employeePayload: UpdateEmployeeInput;
}>;


export type UpdateEmployeeMutation = { updateEmployee: { __typename: 'Employee', id: string, fullname: string, contactInfo: string | null, unit: { __typename: 'Unit', id: string, title: string } } };

export type LoginQueryVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { login: { __typename: 'AuthData', token: string } };

export type UnitsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnitsQuery = { units: Array<{ __typename: 'Unit', id: string, title: string, location: string | null }> };

export type CreateUnitMutationVariables = Exact<{
  unitPayload: CreateUnitInput;
}>;


export type CreateUnitMutation = { createUnit: { __typename: 'Unit', id: string, location: string | null, title: string } };

export type UpdateUnitMutationVariables = Exact<{
  unitPayload: UpdateUnitInput;
}>;


export type UpdateUnitMutation = { updateUnit: { __typename: 'Unit', id: string, title: string, location: string | null } };

export type DeleteUnitMutationVariables = Exact<{
  deleteUnitId: Scalars['ID']['input'];
}>;


export type DeleteUnitMutation = { deleteUnit: { __typename: 'Unit', id: string, title: string, location: string | null } };

export type VpnProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type VpnProfilesQuery = { vpnProfiles: Array<{ __typename: 'VpnProfile', id: string, ipAddress: string, profileCode: string, device: { __typename: 'Device', id: string, manufacturer: string, model: string, os: string, serialNumber: string, employee: { __typename: 'Employee', id: string, fullname: string, unit: { __typename: 'Unit', id: string, title: string } } } | null }> };
