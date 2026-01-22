export async function getEstudiantes(supabase) {
  const { data, error } = await supabase
    .from("estudiantes")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
