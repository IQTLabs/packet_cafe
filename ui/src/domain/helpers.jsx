const timestamp = () => { return new Date().toISOString().split("T")[0]; }

export { timestamp }

export default timestamp;