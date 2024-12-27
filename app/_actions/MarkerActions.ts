"use server";
import { CreateMarkerType } from "../lib/types";
// import { randomUUID } from "crypto";
import { openDb } from "../db/db";
import { revalidatePath } from "next/cache";

async function cleanUpOldMarkers() {
  const db = await openDb();
  try {
    await db.run(
      `DELETE FROM markers WHERE created_at < date('now', '-7 days')`
    );
    /* eslint-disable @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    console.log(e);
  } finally {
    await db.close();
  }
}

export const createNewMarkerServerAction = async (
  newMarker: CreateMarkerType
) => {
  const db = await openDb();
  try {
    // console.log(newMarker)

    await db.run(
      `INSERT INTO markers (city, country, lat, long, message, emoji, happiness) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        newMarker.city,
        newMarker.country,
        newMarker.coordinates[0],
        newMarker.coordinates[1],
        newMarker.message,
        newMarker.emoji,
        newMarker.happiness,
      ]
    );

    // Get all markers
    const markers = await db.all(`SELECT * FROM markers`);
    if (!markers) {
      return {
        success: false,
        message: "",
        error: "No markers found",
        markers: [],
      };
    }

    return {
      success: true,
      message: "Marker created successfully",
      error: "",
      markers,
    };
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: "",
      error: e.message || "Something went wrong",
      markers: [],
    };
  } finally {
    // Close the database connection
    await db.close();
    await cleanUpOldMarkers();
  }
};

// GET ALL MARKERS
export const getAllMarkersServerAction = async () => {
  const db = await openDb();
  try {
    // Get all markers
    const markers = await db.all(`SELECT * FROM markers`);
    if (!markers) {
      return {
        success: false,
        message: "",
        error: "No markers found",
        markers: [],
      };
    }

    return {
      success: true,
      message: "Markers fetched successfully",
      error: "",
      markers,
    };
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: "",
      error: e.message || "Something went wrong",
      markers: [],
    };
  } finally {
    // Close the database connection
    await db.close();
  }
};

// DELETE MARKER ALL MARKERS
export const deleteAllMarkersServerAction = async () => {
  const db = await openDb();
  try {
    // Delete all markers
    await db.run(`DELETE FROM markers`);

    // Revalidate path
    revalidatePath("/");

    // Get all markers
    const markers = await db.all(`SELECT * FROM markers`);
    if (!markers) {
      return {
        success: true,
        message: "Markers deleted successfully",
        error: "",
        markers: [],
      };
    }

    return {
      success: false,
      message: "",
      error: "Markers deleted successfully",
      markers,
    };
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: "",
      error: e.message || "Something went wrong",
      markers: [],
    };
  } finally {
    // Close the database connection
    await db.close();
  }
};

// DELETE SINGLE MARKER
export const deleteMarkerServerAction = async (markerId: number) => {
  const db = await openDb();
  try {
    // Delete all markers
    await db.run(`DELETE FROM markers WHERE id = ?`, [markerId]);

    // Get all markers
    const markers = await db.all(`SELECT * FROM markers`);

    // console.log(markers)

    if (markers) {
      return {
        success: true,
        message: "Marker deleted successfully",
        error: "",
        markers: markers,
      };
    } else {
      return {
        success: false,
        message: "",
        error: "No markers found",
        markers: [],
      };
    }
  } catch (e: any) {
    console.log(e);
    return {
      success: false,
      message: "",
      error: e.message || "Something went wrong",
      markers: [],
    };
  } finally {
    // Close the database connection
    await db.close();
  }
};
