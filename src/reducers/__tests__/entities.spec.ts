// Need to mock Date.now() because it is used down the line
// to generate a per-element class, which breaks snapshot testing.
// Must be done before importing.
const myDate = 1234567890123;

jest.spyOn(Date, 'now').mockImplementation(() => myDate);

import entitiesReducer from '../entities';

describe('entitiesReducer', () => {
  describe('UPDATE_ENTITIY action', () => {
    it('should return a new state with the updated component by name', () => {
      const defaultState = {
        banana: {
          uuid: 'banana',
          name: 'banana',
          components: [
            {
              name: 'RENDER_MESH',
              data: {
                mesh: 'Cube',
                material: 'Default',
                rotation: {
                  name: 'ROTATION',
                  data: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                },
              },
            },
          ],
        },
      };
      const action = {
        componentName: 'RENDER_MESH',
        payload: {
          mesh: 'Cube',
          material: 'Default',
          rotation: {
            name: 'ROTATION',
            data: {
              x: 0,
              y: 0,
              z: 5,
            },
          },
        },
        type: 'UPDATE_ENTITY',
        uuid: 'banana',
      };
      expect(entitiesReducer(defaultState, action)).toHaveProperty('banana', {
        uuid: 'banana',
        name: 'banana',
        updatedAt: myDate,
        needsUpdating: true,
        components: [
          {
            name: 'RENDER_MESH',
            data: {
              mesh: 'Cube',
              material: 'Default',
              rotation: {
                name: 'ROTATION',
                data: {
                  x: 0,
                  y: 0,
                  z: 5,
                },
              },
            },
          },
        ],
      });
    });
  });
});
