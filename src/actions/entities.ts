import { Action, ActionCreator } from 'redux';
import { PayloadAction } from './ui-settings';

// Target UUIDs
export interface EntityAction<Type, Data> extends PayloadAction<Type, Data> {
  uuid: string;
}

// Target UUIDs without paylaods
export interface EntityWithoutPayloadAction<Type> extends Action<Type> {
  uuid: string;
}

// Target Types
export interface TypeAction<Type, Data> extends PayloadAction<Type, Data> {
  entityType: string;
}

export enum EntitiesActionTypes {
  ADD_ENTITIY = '@WILD-MAGIX_ADD_ENTITY',
  UPDATE_ENTITY = '@WILD-MAGIX_UPDATE_ENTITY',
  DELETE_ENTITY = '@WILD-MAGIX_DELETE_ENTITY',
}

export type AddEntityAction = EntityAction<
  EntitiesActionTypes.ADD_ENTITIY,
  { [componentKey: string]: any }
>;

export type EntityState = { uuid: string; [componentKey: string]: any };

export const addEntityAction: ActionCreator<AddEntityAction> = (
  entity: EntityState,
) => ({
  uuid: entity.uuid,
  type: EntitiesActionTypes.ADD_ENTITIY,
  payload: {
    ...entity,
  },
});

export interface UpdateEntityAction
  extends EntityAction<
    EntitiesActionTypes.UPDATE_ENTITY,
    { [componentKey: string]: any }
  > {
  componentName: string;
}

export const updateEntityAction: ActionCreator<UpdateEntityAction> = (
  uuid,
  componentName,
  componentData,
) => ({
  uuid,
  componentName,
  type: EntitiesActionTypes.UPDATE_ENTITY,
  payload: componentData,
});

export type DeleteEntityAction = EntityWithoutPayloadAction<
  EntitiesActionTypes.DELETE_ENTITY
>;

export const deleteEntityAction: ActionCreator<DeleteEntityAction> = (
  entity: EntityState,
) => ({
  uuid: entity.uuid,
  type: EntitiesActionTypes.DELETE_ENTITY,
});

export type EntityTypeActions =
  | AddEntityAction
  | UpdateEntityAction
  | DeleteEntityAction;
