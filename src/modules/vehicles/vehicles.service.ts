import { pool } from "../../config/db";

const createVehicles = async (Payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = Payload;
  const result = await pool.query(
    `
    INSERT INTO vehicles( vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicles = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};

const updateVehicles = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string,
  id: string
) => {
    const result = await pool.query(`
        UPDATE vehicles
        SET
           vehicle_name = COALESCE($1, vehicle_name),
           type = COALESCE($2, type),
           registration_number = COALESCE($3, registration_number),
           daily_rent_price = COALESCE($4, daily_rent_price),
           availability_status = COALESCE($5, availability_status),
           updated_at = NOW()
        WHERE id = $6
        RETURNING *;
        `, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);
        return result;
};

const deleteVehicles = async (id: string) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`, [id]);
    return result;
}

export const vehiclesService = {
    createVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicles,
    deleteVehicles
};