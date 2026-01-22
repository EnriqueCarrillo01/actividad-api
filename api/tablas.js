export async function getTablas(supabase) {
  const { data, error } = await supabase.rpc("get_tables");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
