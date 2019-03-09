import { AnyAction } from 'redux';
import {
  EntityTypeActions,
  EntitiesActionTypes,
  AddEntityAction,
  UpdateEntityAction,
} from '../actions/entities';
import { Component } from 'wild-magic';

export interface EntitiesState {
  [entityUUID: string]: any;
}

export default function entitiesReducer(
  state: EntitiesState = {},
  action: EntityTypeActions | AnyAction,
) {
  console.log(state, action);
  switch (action.type) {
    case EntitiesActionTypes.ADD_ENTITIY:
      return {
        ...state,
        [action.uuid]: (action as AddEntityAction).payload,
      };
    case EntitiesActionTypes.UPDATE_ENTITY:
      const updatedEntity = {
        ...state[action.uuid],
        updatedAt: Date.now(),
        components: [
          ...state[action.uuid].components.reduce(
            (memo: Component<any>[], component: Component<any>) => {
              let newComponent = component;
              if (
                component.name === (action as UpdateEntityAction).componentName
              ) {
                newComponent = {
                  ...newComponent,
                  data: (action as UpdateEntityAction).payload,
                };
              }
              memo.push(newComponent);
              return memo;
            },
            [],
          ),
        ],
      };
      return {
        ...state,
        [action.uuid]: updatedEntity,
      };
    case EntitiesActionTypes.DELETE_ENTITY:
      const { [action.uuid]: deletedEntity, ...rest } = state;
      return rest;
    default:
      return state;
  }
  return state;
}
